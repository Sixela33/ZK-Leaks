import { config } from 'dotenv';
import { createServer } from './server.js';

// Cargar variables de entorno
config();

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

async function start(): Promise<void> {
  try {
    const server = createServer();
    
    await server.listen({ port: PORT, host: HOST });
    
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    console.log(`📧 Mode: ${process.env.NODE_ENV || 'development'}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

start();
