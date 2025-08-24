import { z } from 'zod';

export const TldSchema = z.object({ tld: z.string().min(1).max(253) }).strict();

export const HardenedSchema = z.object({ tld: z.string().min(1).max(253) }).passthrough();

// Esquemas para el flujo de OTP
export const EmailVerificationSchema = z.object({
  email: z.string().email('Invalid email format')
}).strict();

export const OtpVerificationSchema = z.object({
  sessionId: z.string().uuid('Invalid session ID'),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain only digits')
}).strict();

// Esquemas para ZK-email
export const ZKEmailProofSchema = z.object({
  proofData: z.string().min(1, 'Proof data is required'),
  publicData: z.string().min(1, 'Public data is required'),
  tld: z.string().min(1).max(253),
  timestamp: z.number().positive(),
  blueprintSlug: z.string().min(1, 'Blueprint slug is required')
}).strict();

export const ZKEmailVerificationRequestSchema = z.object({
  emailContent: z.string().min(1, 'Email content is required'),
  tld: z.string().min(1).max(253)
}).strict();

export function normalizeTld(input: string): string {
  return input.trim().toLowerCase().replace(/^\./, '');
}

export function isEmailLikeKey(k: string): boolean {
  const lowerKey = k.toLowerCase();
  return lowerKey.includes('email') || lowerKey.includes('mail') || lowerKey.includes('addr');
}

export function containsAtSignDeep(v: unknown): boolean {
  if (typeof v === 'string') {
    return v.includes('@');
  }
  if (Array.isArray(v)) {
    return v.some(containsAtSignDeep);
  }
  if (v && typeof v === 'object') {
    return Object.values(v).some(containsAtSignDeep);
  }
  return false;
}

export const TLD_FORM_REGEX = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/;

export function validateTldForm(tld: string): boolean {
  if (tld.length > 253) return false;
  
  const labels = tld.split('.');
  for (const label of labels) {
    if (label.length > 63 || label.length === 0) return false;
  }
  
  return TLD_FORM_REGEX.test(tld);
}

export function sanitizeHardenedBody(body: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(body)) {
    if (isEmailLikeKey(key) || containsAtSignDeep(value)) {
      continue;
    }
    sanitized[key] = value;
  }
  
  return sanitized;
}
