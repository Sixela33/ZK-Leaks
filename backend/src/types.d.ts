declare global {
  var process: {
    env: Record<string, string | undefined>;
    exit: (code: number) => never;
    on: (event: string, handler: () => void) => void;
  };
  var console: {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
  var global: {
    gc?: () => void;
  };
}

// Declaraciones de módulos
declare module 'fastify' {
  export default function Fastify(options?: any): any;
  export interface FastifyInstance {}
  export interface FastifyReply {
    status: (code: number) => FastifyReply;
    send: (data: any) => void;
    header: (name: string, value: string) => void;
  }
  export interface FastifyRequest {
    body: any;
    headers: Record<string, string | undefined>;
    method: string;
    url: string;
    params: any;
  }
}

declare module 'dotenv' {
  export function config(): void;
}

declare module 'uuid' {
  export function v4(): string;
}

declare module 'nodemailer' {
  export function createTransport(options: any): any;
  export function createTestAccount(): Promise<any>;
  export function getTestMessageUrl(info: any): string;
}

declare module '@zk-email/sdk' {
  export function initZkEmailSdk(options?: any): any;
}

export {};

// Tipos para el sistema ZK-email
export interface ZKEmailProof {
  proofData: string;
  publicData: string;
  tld: string;
  timestamp: number;
  blueprintSlug: string;
}

export interface ZKEmailVerificationRequest {
  emailContent: string; // Contenido del email como string
  tld: string; // TLD extraído por el cliente
}

export interface ZKEmailVerificationResponse {
  verified: boolean;
  tld: string;
  message: string;
  onChainVerified?: boolean;
}

// Tipos para el sistema legacy (mantener compatibilidad)
export interface EmailVerificationRequest {
  email: string;
}

export interface OtpVerificationRequest {
  sessionId: string;
  otp: string;
}

export interface OtpSession {
  id: string;
  email: string; // Campo vacío - NO se almacena el email completo
  tld: string;
  otp: string;
  expiresAt: Date;
  verified: boolean;
}

export interface VerificationResponse {
  sessionId: string;
  message: string;
}

export interface OtpVerificationResponse {
  tld: string;
  verified: boolean;
  message: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}
