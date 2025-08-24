import { config } from 'dotenv';
import { createServer } from './server.js';
import { createPinata } from './pinata.js';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

async function start(): Promise<void> {
  try {
    let server = createServer();
    server.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    server.register(fastifyEnv, {
      confKey: 'config',
      schema: {
        type: 'object',
        properties: {
          PINATA_JWT: { type: 'string' },
          PINATA_GATEWAY_URL: { type: 'string' },
        },
        required: ['PINATA_JWT', 'PINATA_GATEWAY_URL'],
      },
      dotenv: true,
    });
    server = createPinata(server);

    await server.listen({ port: PORT, host: HOST });
    
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    console.log(`📧 Mode: ${process.env.NODE_ENV || 'development'}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

start();
