# ZKLEAKS TLD Validator

Microservicio para validación de TLD con privacidad garantizada y verificación de email mediante OTP. El servidor **nunca** almacena emails completos permanentemente, solo TLDs extraídos y verificados.

## Objetivo

Validar la forma de TLDs y verificar la propiedad de emails mediante OTP sin comprometer la privacidad del usuario. El sistema es completamente anónimo y no almacena información personal.

## Flujo Completo de Verificación

```
1. Usuario envía email → 2. Servidor genera OTP → 3. Envía OTP por email → 4. Usuario verifica OTP → 5. Se almacena solo el TLD verificado
```

### Características de Privacidad

- **Anonimato completo**: No se almacenan emails completos
- **Solo TLDs**: Solo se guarda el dominio del email (ej: gmail.com)
- **Sesiones temporales**: Los datos se eliminan automáticamente
- **Sin logs**: No se registran emails ni datos personales
- **Verificación real**: OTP confirma propiedad del email

## Amenazas Mitigadas

- **Exposición de emails**: El servidor rechaza cualquier contenido que contenga `@` o campos email-like
- **Logging de datos sensibles**: Sin logs de request/response, analytics, APM o tracing
- **Cache de respuestas**: Headers anti-cache configurados
- **Tracking**: Headers de privacidad implementados
- **Persistencia**: Sin escritura a disco, sesiones temporales en memoria
- **Query strings**: Rechazados en endpoints sensibles (solo POST con JSON)

## Cómo ejecutar

### Configuración

1. Copia el archivo de configuración:
```bash
cp env.example .env
```

2. Configura las variables SMTP en `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
```

**Nota**: Para Gmail, necesitas una "Contraseña de aplicación":
1. Ve a tu cuenta de Google
2. Seguridad > Verificación en dos pasos > Contraseñas de aplicación
3. Genera una contraseña para esta aplicación

### Desarrollo
```bash
pnpm install
pnpm dev
```

### Producción
```bash
pnpm install
pnpm build
pnpm start
```

### Docker
```bash
docker build -t tld-validator .
docker run -p 3000:3000 --env-file .env tld-validator
```

## API

### POST /request-otp
Solicita un código OTP para verificar un email.

**Request:**
```json
{
  "email": "usuario@gmail.com"
}
```

**Response:**
```json
{
  "sessionId": "uuid-session-id",
  "message": "OTP sent successfully",
  "tld": "gmail.com"
}
```

### POST /verify-otp
Verifica el código OTP y confirma la propiedad del email.

**Request:**
```json
{
  "sessionId": "uuid-session-id",
  "otp": "123456"
}
```

**Response:**
```json
{
  "tld": "gmail.com",
  "verified": true,
  "message": "Email verified successfully"
}
```

### GET /verified-tld/:sessionId
Obtiene el TLD verificado de una sesión.

**Response:**
```json
{
  "tld": "gmail.com",
  "verified": true
}
```

### POST /check-tld
Valida la forma de un TLD con validación estricta.

**Request:**
```json
{
  "tld": "com"
}
```

**Response:**
```json
{
  "tld": "com",
  "status": "valid_form"
}
```

### POST /hardened
Versión que elimina silenciosamente campos email-like y valores con `@`.

**Request:**
```json
{
  "tld": "com",
  "email": "user@example.com",
  "extra": "data"
}
```

**Response:**
```json
{
  "tld": "com",
  "status": "valid_form"
}
```

### GET /health
Endpoint de salud del servicio.

**Response:**
```json
{
  "ok": true
}
```

## Ejemplos cURL

### Flujo completo de verificación

```bash
# 1. Solicitar OTP
curl -X POST http://localhost:3000/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@gmail.com"}'

# 2. Verificar OTP (reemplaza con el código recibido)
curl -X POST http://localhost:3000/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "uuid-session-id", "otp": "123456"}'

# 3. Obtener TLD verificado
curl http://localhost:3000/verified-tld/uuid-session-id
```

### Validación básica
```bash
curl -X POST http://localhost:3000/check-tld \
  -H "Content-Type: application/json" \
  -d '{"tld": "com"}'
```

### Health check
```bash
curl http://localhost:3000/health
```

## Flujo en Postman

### 1. Solicitar OTP
- **Método**: `POST`
- **URL**: `http://localhost:3000/request-otp`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "email": "tu-email@gmail.com"
}
```

### 2. Verificar OTP
- **Método**: `POST`
- **URL**: `http://localhost:3000/verify-otp`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "sessionId": "session-id-from-step-1",
  "otp": "123456"
}
```

### 3. Obtener TLD Verificado
- **Método**: `GET`
- **URL**: `http://localhost:3000/verified-tld/{sessionId}`

## Validación de TLD

- **Formato**: `^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$`
- **Longitud total**: ≤ 253 caracteres
- **Longitud por label**: ≤ 63 caracteres
- **Normalización**: lowercase, remover punto inicial
- **No DNS lookup**: Solo validación de forma

## Códigos de Error

- `400` - `invalid_email_format`: Formato de email inválido
- `400` - `invalid_session`: ID de sesión inválido
- `400` - `session_expired`: Sesión expirada
- `400` - `invalid_otp`: Código OTP inválido
- `400` - `invalid_tld_form`: Forma de TLD inválida
- `400` - `email_like_rejected`: Contenido email-like detectado
- `400` - `invalid_request`: Request malformado
- `405` - `method_not_allowed`: Método HTTP no permitido
- `415` - `unsupported_media_type`: Content-Type no soportado
- `500` - `email_send_failed`: Error al enviar email

## Seguridad

- **OTP de 6 dígitos**: Códigos numéricos de 6 dígitos
- **Expiración**: Sesiones expiran en 10 minutos
- **Limpieza automática**: Datos eliminados automáticamente
- **Sin persistencia**: No se escriben emails a disco
- **Validación estricta**: Rechazo de contenido email-like

## Escalabilidad

El microservicio está diseñado para ser escalable y permitir la implementación de endpoints adicionales. La arquitectura modular facilita la adición de nuevas funcionalidades como integración con IPFS.

## Privacidad Futura

Para verificación real de propiedad de email con anonimato completo, considera integración futura con [zk-email](https://github.com/zkemail/zk-email) para probar posesión de inbox sin revelar la dirección.


