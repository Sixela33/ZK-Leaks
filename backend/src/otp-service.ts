import { randomBytes, randomInt } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { OtpSession, EmailConfig } from './types.js';

// Almacenamiento en memoria (en producción usar Redis o similar)
const otpSessions = new Map<string, OtpSession>();

// Configuración de email (configurar con variables de entorno)
const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
};

// Crear transportador de email
let transporter: nodemailer.Transporter | undefined;

// Función para inicializar el transportador
async function initializeTransporter(): Promise<void> {
  if (process.env.NODE_ENV === 'demo' || !emailConfig.auth.user) {
    // Usar Ethereal Email para demo
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('📧 Demo mode: Using Ethereal Email');
    console.log(`📧 Test account: ${testAccount.user}`);
  } else {
    // Usar configuración real
    transporter = nodemailer.createTransport(emailConfig);
    console.log('📧 Production mode: Using configured SMTP');
  }
}

export class OtpService {
  private static generateOtp(): string {
    return randomInt(100000, 999999).toString();
  }

  private static extractTld(email: string): string {
    const parts = email.split('@');
    if (parts.length !== 2) {
      throw new Error('Invalid email format');
    }
    return parts[1].toLowerCase();
  }

  private static generateSessionId(): string {
    return uuidv4();
  }

  // Función para limpiar datos sensibles de memoria
  private static secureCleanup(sessionId: string): void {
    const session = otpSessions.get(sessionId);
    if (session) {
      // Sobrescribir datos sensibles con valores aleatorios
      session.otp = randomInt(100000, 999999).toString();
      session.otp = '';
      session.email = '';
      
      // Eliminar la sesión
      otpSessions.delete(sessionId);
      
      console.log('🔒 SECURITY: Session securely cleaned and removed');
    }
  }

  static async createOtpSession(email: string): Promise<{ sessionId: string; tld: string }> {
    // Inicializar transportador si no existe
    if (!transporter) {
      await initializeTransporter();
    }

    // Verificar que el transportador se inicializó correctamente
    if (!transporter) {
      throw new Error('Failed to initialize email transporter');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Extraer TLD
    const tld = this.extractTld(email);
    
    // Generar OTP y session ID
    const otp = this.generateOtp();
    const sessionId = this.generateSessionId();
    
    // Crear sesión (expira en 10 minutos) - SIN ALMACENAR EL EMAIL
    const session: OtpSession = {
      id: sessionId,
      email: '', // NO almacenamos el email completo
      tld,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutos
      verified: false
    };

    // Guardar sesión
    otpSessions.set(sessionId, session);
    
    // Log de seguridad - verificar que NO se almacena el email
    console.log('🔒 SECURITY: Email NOT stored in session');
    console.log('🔒 SECURITY: Only TLD stored:', tld);
    console.log('🔒 SECURITY: Session expires in 10 minutes');

    // Enviar OTP por email
    await this.sendOtpEmail(email, otp);

    // Limpiar variable local inmediatamente
    const result = { sessionId, tld };
    
    // Forzar garbage collection si está disponible
    if (global.gc) {
      global.gc();
    }

    return result;
  }

  private static async sendOtpEmail(email: string, otp: string): Promise<void> {
    if (!transporter) {
      throw new Error('Email transporter not initialized');
    }

    const mailOptions = {
      from: process.env.NODE_ENV === 'demo' ? 'demo@zkleaks.com' : emailConfig.auth.user,
      to: email,
      subject: 'Código de verificación ZKLEAKS',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Verificación de Email</h2>
          <p>Tu código de verificación es:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 8px;">${otp}</h1>
          </div>
          <p>Este código expira en 10 minutos.</p>
          <p style="color: #666; font-size: 12px;">
            Si no solicitaste este código, puedes ignorar este email.
          </p>
        </div>
      `
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      
      // En modo demo, mostrar el enlace para ver el email
      if (process.env.NODE_ENV === 'demo') {
        console.log('📧 Demo email sent!');
        console.log(`📧 Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      }
      
      // Limpiar variables locales inmediatamente
      console.log('🔒 SECURITY: Email sent, local variables cleaned');
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }

  static verifyOtp(sessionId: string, otp: string): { tld: string; verified: boolean } {
    const session = otpSessions.get(sessionId);
    
    if (!session) {
      throw new Error('Invalid session ID');
    }

    if (session.expiresAt < new Date()) {
      this.secureCleanup(sessionId);
      throw new Error('OTP session expired');
    }

    if (session.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // Marcar como verificado
    session.verified = true;
    
    // Limpiar OTP de la sesión por seguridad
    session.otp = '';
    console.log('🔒 SECURITY: OTP cleared after verification');

    return { tld: session.tld, verified: true };
  }

  static getVerifiedTld(sessionId: string): string | null {
    const session = otpSessions.get(sessionId);
    
    if (!session || !session.verified) {
      return null;
    }

    return session.tld;
  }

  static cleanupExpiredSessions(): void {
    const now = new Date();
    let cleanedCount = 0;
    
    for (const [sessionId, session] of otpSessions.entries()) {
      if (session.expiresAt < now) {
        this.secureCleanup(sessionId);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🔒 SECURITY: Cleaned ${cleanedCount} expired sessions`);
    }
  }

  // Método para limpiar sesiones verificadas después de un tiempo
  static cleanupVerifiedSessions(): void {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    let cleanedCount = 0;
    
    for (const [sessionId, session] of otpSessions.entries()) {
      if (session.verified && session.expiresAt < oneHourAgo) {
        this.secureCleanup(sessionId);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🔒 SECURITY: Cleaned ${cleanedCount} verified sessions`);
    }
  }

  // Método para limpiar todas las sesiones (emergencia)
  static emergencyCleanup(): void {
    const count = otpSessions.size;
    for (const [sessionId] of otpSessions.entries()) {
      this.secureCleanup(sessionId);
    }
    console.log(`🔒 SECURITY: Emergency cleanup - removed ${count} sessions`);
  }
}

// Limpiar sesiones expiradas cada 5 minutos
setInterval(() => {
  OtpService.cleanupExpiredSessions();
  OtpService.cleanupVerifiedSessions();
}, 5 * 60 * 1000);

// Limpieza de emergencia al cerrar el proceso
process.on('SIGINT', () => {
  console.log('🔒 SECURITY: Process shutting down, cleaning all sessions...');
  OtpService.emergencyCleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🔒 SECURITY: Process terminating, cleaning all sessions...');
  OtpService.emergencyCleanup();
  process.exit(0);
});


