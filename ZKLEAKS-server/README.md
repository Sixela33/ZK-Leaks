# ZKLEAKS TLD Validator

Microservicio para validación de TLD con privacidad garantizada. El servidor **nunca** recibe emails completos, solo acepta TLDs extraídos localmente por el cliente.

## Objetivo

Validar la forma de TLDs sin comprometer la privacidad del usuario. El cliente debe extraer el TLD de su email localmente y enviar únicamente `{ tld: string }`.

## Amenazas Mitigadas

- **Exposición de emails**: El servidor rechaza cualquier contenido que contenga `@` o campos email-like
- **Logging de datos sensibles**: Sin logs de request/response, analytics, APM o tracing
- **Cache de respuestas**: Headers anti-cache configurados
- **Tracking**: Headers de privacidad implementados
- **Persistencia**: Sin escritura a disco, sesiones o cookies
- **Query strings**: Rechazados en `/check-tld` (solo POST con JSON)

## Arquitectura

```
Cliente → Extrae TLD localmente → Envía { tld } → Servidor valida forma → Respuesta
```

**IMPORTANTE**: Nunca envíes emails completos al servidor. Extrae el TLD en tu aplicación cliente.

## Cómo ejecutar

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
docker run -p 3000:3000 tld-validator
```

## API

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

### Validación básica
```bash
curl -X POST http://localhost:3000/check-tld \
  -H "Content-Type: application/json" \
  -d '{"tld": "com"}'
```

### Validación con normalización
```bash
curl -X POST http://localhost:3000/check-tld \
  -H "Content-Type: application/json" \
  -d '{"tld": ".COM"}'
```

### Versión hardened
```bash
curl -X POST http://localhost:3000/hardened \
  -H "Content-Type: application/json" \
  -d '{"tld": "org", "email": "test@example.com", "extra": "data"}'
```

### Health check
```bash
curl http://localhost:3000/health
```

## Validación de TLD

- **Formato**: `^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$`
- **Longitud total**: ≤ 253 caracteres
- **Longitud por label**: ≤ 63 caracteres
- **Normalización**: lowercase, remover punto inicial
- **No DNS lookup**: Solo validación de forma

## Códigos de Error

- `400` - `invalid_tld_form`: Forma de TLD inválida
- `400` - `email_like_rejected`: Contenido email-like detectado
- `400` - `invalid_request`: Request malformado
- `405` - `method_not_allowed`: Método HTTP no permitido
- `415` - `unsupported_media_type`: Content-Type no soportado

## Escalabilidad

El microservicio está diseñado para ser escalable y permitir la implementación de endpoints adicionales. La arquitectura modular facilita la adición de nuevas funcionalidades como integración con IPFS.

## Privacidad Futura

Para verificación real de propiedad de email con anonimato completo, considera integración futura con [zk-email](https://github.com/zkemail/zk-email) para probar posesión de inbox sin revelar la dirección.


