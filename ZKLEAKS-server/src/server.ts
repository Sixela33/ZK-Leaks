import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { 
  TldSchema, 
  HardenedSchema, 
  EmailVerificationSchema,
  OtpVerificationSchema,
  normalizeTld, 
  validateTldForm, 
  containsAtSignDeep, 
  isEmailLikeKey, 
  sanitizeHardenedBody 
} from './validation.js';
import { OtpService } from './otp-service.js';

export function createServer(): FastifyInstance {
  const fastify = Fastify({
    logger: false,
    trustProxy: true,
    bodyLimit: 1024,
  });

  fastify.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, done) => {
    reply.header('Cache-Control', 'no-store');
    reply.header('Referrer-Policy', 'no-referrer');
    reply.header('X-Content-Type-Options', 'nosniff');
    reply.header('Permissions-Policy', 'interest-cohort=()');
    done();
  });

  fastify.addHook('preHandler', (request: FastifyRequest, reply: FastifyReply, done) => {
    if (['/check-tld', '/request-otp', '/verify-otp'].includes(request.url)) {
      if (request.method !== 'POST') {
        reply.status(405).send({ error: 'method_not_allowed' });
        return;
      }
      // En modo demo, ser más permisivo con el Content-Type
      const contentType = request.headers['content-type'] || '';
      if (!contentType.includes('application/json') && process.env.NODE_ENV !== 'demo') {
        reply.status(415).send({ error: 'unsupported_media_type' });
        return;
      }
    }
    done();
  });

  // Endpoint original para validar TLD
  fastify.post('/check-tld', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = TldSchema.parse(request.body);

      if (containsAtSignDeep(request.body) || Object.keys(request.body as Record<string, unknown>).some(isEmailLikeKey)) {
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
  });

  // Endpoint hardened original
  fastify.post('/hardened', async (request: FastifyRequest, reply: FastifyReply) => {
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
  });

  // NUEVO: Endpoint para solicitar OTP
  fastify.post('/request-otp', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      console.log('📧 Request body:', request.body);
      const data = EmailVerificationSchema.parse(request.body);
      
      const { sessionId, tld } = await OtpService.createOtpSession(data.email);
      
      reply.send({ 
        sessionId, 
        message: 'OTP sent successfully',
        tld: tld // Solo para confirmación, no se almacena permanentemente
      });
    } catch (error) {
      console.error('📧 Error in request-otp:', error);
      if (error instanceof Error) {
        if (error.message === 'Invalid email format') {
          reply.status(400).send({ error: 'invalid_email_format' });
        } else if (error.message === 'Failed to send OTP email') {
          reply.status(500).send({ error: 'email_send_failed' });
        } else {
          reply.status(400).send({ error: 'invalid_request', details: error.message });
        }
      } else {
        reply.status(400).send({ error: 'invalid_request' });
      }
    }
  });

  // NUEVO: Endpoint para verificar OTP
  fastify.post('/verify-otp', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = OtpVerificationSchema.parse(request.body);
      
      const { tld, verified } = OtpService.verifyOtp(data.sessionId, data.otp);
      
      if (verified) {
        reply.send({ 
          tld, 
          verified: true,
          message: 'Email verified successfully'
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
  });

  // NUEVO: Endpoint para obtener TLD verificado
  fastify.get('/verified-tld/:sessionId', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { sessionId } = request.params as { sessionId: string };
      
      const tld = OtpService.getVerifiedTld(sessionId);
      
      if (tld) {
        reply.send({ tld, verified: true });
      } else {
        reply.status(404).send({ error: 'session_not_found_or_not_verified' });
      }
    } catch (error) {
      reply.status(400).send({ error: 'invalid_request' });
    }
  });

  fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ ok: true });
  });

  return fastify;
}
