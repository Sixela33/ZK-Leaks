declare global {
  var process: {
    env: Record<string, string | undefined>;
    exit: (code: number) => never;
  };
  var console: {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
}

export {};

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
