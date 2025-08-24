import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TldSchema, HardenedSchema, normalizeTld, validateTldForm, containsAtSignDeep, isEmailLikeKey, sanitizeHardenedBody } from './validation.js';

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
    if (request.url === '/check-tld') {
      if (request.method !== 'POST') {
        reply.status(405).send({ error: 'method_not_allowed' });
        return;
      }
      if (request.headers['content-type'] !== 'application/json') {
        reply.status(415).send({ error: 'unsupported_media_type' });
        return;
      }
    }
    done();
  });

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

  fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ ok: true });
  });

  return fastify;
}
