import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import {
  TldSchema,
  HardenedSchema,
  EmailVerificationSchema,
  OtpVerificationSchema,
  ZKEmailProofSchema,
  ZKEmailVerificationRequestSchema,
  normalizeTld,
  validateTldForm,
  containsAtSignDeep,
  isEmailLikeKey,
  sanitizeHardenedBody,
} from './validation.js';
import { OtpService } from './otp-service.js';
import { ZKEmailService } from './zk-email-service.js';
import type { ZKEmailProof, ZKEmailVerificationRequest } from './types.js';

export function createServer(): FastifyInstance {
  const fastify = Fastify({
    logger: false,
    trustProxy: true,
    bodyLimit: 1024 * 1024, // 1MB para contenido de email
  });

  fastify.addHook(
    'onRequest',
    (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      reply.header('Cache-Control', 'no-store');
      reply.header('Referrer-Policy', 'no-referrer');
      reply.header('X-Content-Type-Options', 'nosniff');
      reply.header('Permissions-Policy', 'interest-cohort=()');
      done();
    }
  );

  fastify.addHook(
    'preHandler',
    (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      if (
        [
          '/check-tld',
          '/request-otp',
          '/verify-otp',
          '/zk-verify-email',
          '/zk-verify-proof',
        ].includes(request.url)
      ) {
        if (request.method !== 'POST') {
          reply.status(405).send({ error: 'method_not_allowed' });
          return;
        }
        // En modo demo, ser más permisivo con el Content-Type
        const contentType = request.headers['content-type'] || '';
        if (
          !contentType.includes('application/json') &&
          process.env.NODE_ENV !== 'demo'
        ) {
          reply.status(415).send({ error: 'unsupported_media_type' });
          return;
        }
      }
      done();
    }
  );

  // Endpoint original para validar TLD
  fastify.post(
    '/check-tld',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = TldSchema.parse(request.body);

        if (
          containsAtSignDeep(request.body) ||
          Object.keys(request.body as Record<string, unknown>).some(
            isEmailLikeKey
          )
        ) {
          reply.status(400).send({ error: 'email_like_rejected' });
          return;
        }

        const tld = normalizeTld(data.tld);

        if (!validateTldForm(tld)) {
          reply.status(400).send({ error: 'invalid_tld_form' });
          return;
        }

        reply.send({ tld, status: 'valid_form' });
      } catch (error) {
        reply.status(400).send({ error: 'invalid_request' });
      }
    }
  );

  // Endpoint hardened original
  fastify.post(
    '/hardened',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const rawBody = request.body as Record<string, unknown>;
        const sanitizedBody = sanitizeHardenedBody(rawBody);
        const data = HardenedSchema.parse(sanitizedBody);

        const tld = normalizeTld(data.tld);

        if (!validateTldForm(tld)) {
          reply.status(400).send({ error: 'invalid_tld_form' });
          return;
        }

        reply.send({ tld, status: 'valid_form' });
      } catch (error) {
        reply.status(400).send({ error: 'invalid_request' });
      }
    }
  );

  // NUEVO: Endpoint específico para DEMO de hackathon
  fastify.post(
    '/demo-verify-email',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log('🎯 DEMO: Processing hackathon demo verification request');
        const data = request.body as { email: string };

        // Validar que se proporcionó email
        if (!data.email) {
          reply.status(400).send({ error: 'missing_email' });
          return;
        }

        // Validar formato básico de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          reply.status(400).send({ error: 'invalid_email_format' });
          return;
        }

        // Proceso completo de verificación para demo
        const demoResult = await ZKEmailService.verifyEmailForDemo(data.email);

        if (demoResult.success) {
          reply.send({
            success: true,
            message:
              '🎉 Email verification completed successfully for hackathon demo!',
            demo: {
              // ❌ ELIMINADO: email: demoResult.email, // BACHE DE SEGURIDAD
              domain: demoResult.domain,
              tld: demoResult.tld,
              mxRecords: demoResult.mxRecords,
              spfRecords: demoResult.spfRecords,
              verificationResult: demoResult.verificationResult,
              onChainVerified: demoResult.onChainVerified,
              timestamp: demoResult.timestamp,
            },
            zkProof: demoResult.zkProof,
          });
        } else {
          reply.status(400).send({
            success: false,
            error: 'demo_verification_failed',
            message: demoResult.error,
            demo: {
              // ❌ ELIMINADO: email: demoResult.email, // BACHE DE SEGURIDAD
              timestamp: demoResult.timestamp,
            },
          });
        }
      } catch (error) {
        console.error('🎯 DEMO: Error in demo verification:', error);
        if (error instanceof Error) {
          reply.status(400).send({
            error: 'demo_verification_failed',
            details: error.message,
          });
        } else {
          reply.status(400).send({ error: 'invalid_request' });
        }
      }
    }
  );

  // NUEVO: Endpoint ZK-email REAL - Email NUNCA sale del cliente
  fastify.post(
    '/zk-verify-email',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log(
          '🔒 ZK: Processing ZK email verification request with DKIM'
        );
        const data = request.body as { email: string }; // Solo email

        // Validar que se proporcionó email
        if (!data.email) {
          reply.status(400).send({ error: 'missing_email' });
          return;
        }

        // Extraer TLD automáticamente
        const tld = ZKEmailService.extractTld(data.email);

        // Validar formato de TLD
        if (!validateTldForm(tld)) {
          reply.status(400).send({ error: 'invalid_tld_form' });
          return;
        }

        // GENERAR CONTENIDO DE EMAIL CON DKIM SIMULADO
        const emailContent = ZKEmailService.generateEmailContentWithDkim(
          data.email,
          tld
        );

        // GENERAR PRUEBA ZK REAL CON DKIM - El email NUNCA sale del cliente
        const zkProof = await ZKEmailService.generateEmailProof(
          emailContent,
          tld
        );

        reply.send({
          success: true,
          message: 'ZK proof generated successfully with DKIM verification',
          proof: zkProof,
          tld: tld,
          dkimVerified: zkProof.dkimVerified || false,
        });
      } catch (error) {
        console.error('🔒 ZK: Error in zk-verify-email:', error);
        if (error instanceof Error) {
          reply
            .status(400)
            .send({
              error: 'zk_proof_generation_failed',
              details: error.message,
            });
        } else {
          reply.status(400).send({ error: 'invalid_request' });
        }
      }
    }
  );

  // NUEVO: Endpoint ZK-email para verificar prueba
  fastify.post(
    '/zk-verify-proof',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log('🔒 ZK: Processing proof verification request');
        const data = request.body as ZKEmailProof;

        // Validar estructura de la prueba
        if (!data.proofData || !data.publicData || !data.tld) {
          reply.status(400).send({ error: 'invalid_proof_structure' });
          return;
        }

        // Verificar prueba ZK
        const result = await ZKEmailService.verifyEmailProof(data);

        if (result.verified) {
          // Opcional: verificar en blockchain
          const onChainVerified = await ZKEmailService.verifyProofOnChain(data);

          reply.send({
            verified: true,
            tld: result.tld,
            message: 'Email verified successfully using ZK proof',
            onChainVerified,
            timestamp: data.timestamp,
          });
        } else {
          reply.status(400).send({
            verified: false,
            error: 'zk_proof_verification_failed',
            message: 'ZK proof verification failed',
          });
        }
      } catch (error) {
        console.error('🔒 ZK: Error in zk-verify-proof:', error);
        if (error instanceof Error) {
          reply
            .status(400)
            .send({
              error: 'zk_proof_verification_failed',
              details: error.message,
            });
        } else {
          reply.status(400).send({ error: 'invalid_request' });
        }
      }
    }
  );

  // NUEVO: Endpoint para obtener información del blueprint
  fastify.get(
    '/zk-blueprint-info',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const blueprintInfo = await ZKEmailService.getBlueprintInfo();
        reply.send(blueprintInfo);
      } catch (error) {
        reply.status(500).send({ error: 'failed_to_get_blueprint_info' });
      }
    }
  );

  // NUEVO: Endpoint para obtener metadatos de IPFS (proxy para evitar CORS)
  fastify.get('/ipfs-metadata/:cid', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { cid } = request.params as { cid: string };
      
      console.log('🔍 IPFS Metadata Request for CID:', cid);
      
      // Validar que el CID no esté vacío
      if (!cid || cid.trim() === '') {
        console.log('❌ Missing CID');
        reply.status(400).send({ error: 'missing_cid' });
        return;
      }

      // Try multiple IPFS gateways with fallback
      const gateways = [
        `https://gateway.pinata.cloud/ipfs/${cid}`,
        `https://ipfs.io/ipfs/${cid}`,
        `https://dweb.link/ipfs/${cid}`,
        `https://cloudflare-ipfs.com/ipfs/${cid}`
      ];

      for (const gateway of gateways) {
        try {
          console.log(`🌐 Trying gateway: ${gateway}`);
          
          const response = await fetch(gateway, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'ZK-Leaks-Backend/1.0'
            }
          });
          
          console.log(`📡 ${gateway} Response status:`, response.status);
          
          if (response.ok) {
            const metadata = await response.json();
            console.log('✅ IPFS Metadata received:', metadata);
            
            // Validar que sea un objeto JSON válido
            if (typeof metadata !== 'object' || metadata === null) {
              console.log('❌ Invalid metadata format');
              continue; // Try next gateway
            }

            console.log(`🎉 Success with gateway: ${gateway}`);
            reply.send({
              success: true,
              metadata,
              cid,
              gateway: gateway,
              timestamp: new Date().toISOString()
            });
            return;
          } else if (response.status === 429) {
            console.log(`⚠️ Rate limited by ${gateway}, trying next...`);
            continue;
          } else {
            console.log(`❌ ${gateway} failed with status: ${response.status}`);
            continue;
          }
        } catch (gatewayError) {
          console.log(`💥 Error with ${gateway}:`, gatewayError);
          continue;
        }
      }
      
      // If all gateways failed
      console.log('❌ All gateways failed for CID:', cid);
      reply.status(404).send({ 
        error: 'ipfs_content_not_found',
        message: 'All IPFS gateways failed to retrieve content',
        cid: cid
      });
      
    } catch (error) {
      console.error('💥 Error fetching IPFS metadata:', error);
      if (error instanceof Error) {
        reply.status(500).send({ 
          error: 'ipfs_fetch_failed', 
          details: error.message 
        });
      } else {
        reply.status(500).send({ error: 'ipfs_fetch_failed' });
      }
    }
  });

  // Endpoints legacy (mantener compatibilidad)
  fastify.post(
    '/request-otp',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log('📧 Request body:', request.body);
        const data = EmailVerificationSchema.parse(request.body);

        const { sessionId, tld } = await OtpService.createOtpSession(
          data.email
        );

        reply.send({
          sessionId,
          message: 'OTP sent successfully',
          tld: tld, // Solo para confirmación, no se almacena permanentemente
        });
      } catch (error) {
        console.error('📧 Error in request-otp:', error);
        if (error instanceof Error) {
          if (error.message === 'Invalid email format') {
            reply.status(400).send({ error: 'invalid_email_format' });
          } else if (error.message === 'Failed to send OTP email') {
            reply.status(500).send({ error: 'email_send_failed' });
          } else {
            reply
              .status(400)
              .send({ error: 'invalid_request', details: error.message });
          }
        } else {
          reply.status(400).send({ error: 'invalid_request' });
        }
      }
    }
  );

  fastify.post(
    '/verify-otp',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = OtpVerificationSchema.parse(request.body);

        const { tld, verified } = OtpService.verifyOtp(
          data.sessionId,
          data.otp
        );

        if (verified) {
          reply.send({
            tld,
            verified: true,
            message: 'Email verified successfully',
          });
        } else {
          reply.status(400).send({ error: 'verification_failed' });
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Invalid session ID') {
            reply.status(400).send({ error: 'invalid_session' });
          } else if (error.message === 'OTP session expired') {
            reply.status(400).send({ error: 'session_expired' });
          } else if (error.message === 'Invalid OTP') {
            reply.status(400).send({ error: 'invalid_otp' });
          } else {
            reply.status(400).send({ error: 'invalid_request' });
          }
        } else {
          reply.status(400).send({ error: 'invalid_request' });
        }
      }
    }
  );

  fastify.get(
    '/verified-tld/:sessionId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { sessionId } = request.params as { sessionId: string };

        const tld = OtpService.getVerifiedTld(sessionId);

        if (tld) {
          reply.send({ tld, verified: true });
        } else {
          reply
            .status(404)
            .send({ error: 'session_not_found_or_not_verified' });
        }
      } catch (error) {
        reply.status(400).send({ error: 'invalid_request' });
      }
    }
  );

  fastify.get(
    '/health',
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ ok: true });
    }
  );

  return fastify;
}
