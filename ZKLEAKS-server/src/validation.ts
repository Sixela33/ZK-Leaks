import { z } from 'zod';

export const TldSchema = z.object({ tld: z.string().min(1).max(253) }).strict();

export const HardenedSchema = z.object({ tld: z.string().min(1).max(253) }).passthrough();

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
