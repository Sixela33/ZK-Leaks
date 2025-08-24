import { createServer } from './server.js';

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

async function start(): Promise<void> {
  try {
    const server = createServer();
    
    await server.listen({ port: PORT, host: HOST });
    
    console.log(`Server running on http://${HOST}:${PORT}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

start();
