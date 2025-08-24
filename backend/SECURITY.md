# 🔒 Seguridad y Privacidad - ZKLEAKS TLD Validator

## 🎯 Objetivo de Privacidad

Este sistema está diseñado para **NUNCA** almacenar, exponer o registrar emails completos. Solo se almacenan TLDs (Top Level Domains) extraídos de forma anónima.

## 🛡️ Medidas de Seguridad Implementadas

### 1. **NO Almacenamiento de Emails**
- ✅ **Email completo**: NUNCA se almacena en memoria
- ✅ **Campo email en sesión**: Se deja vacío (`""`)
- ✅ **Solo TLD**: Se almacena únicamente el dominio (ej: `gmail.com`)
- ✅ **Logs de seguridad**: Verifican que el email no se almacena

### 2. **Limpieza Automática y Segura**
- ✅ **Sesiones expiradas**: Se eliminan automáticamente cada 5 minutos
- ✅ **Sesiones verificadas**: Se eliminan después de 1 hora
- ✅ **OTP limpiado**: Se borra inmediatamente después de verificación
- ✅ **Sin persistencia**: No se escriben datos a disco
- ✅ **Limpieza segura**: Sobrescribe datos antes de eliminar
- ✅ **Limpieza de emergencia**: Al cerrar el proceso

### 3. **Headers de Seguridad**
- ✅ **Cache-Control**: `no-store` - No cachear respuestas
- ✅ **Referrer-Policy**: `no-referrer` - No enviar referrer
- ✅ **X-Content-Type-Options**: `nosniff` - Prevenir MIME sniffing
- ✅ **Permissions-Policy**: `interest-cohort=()` - Bloquear FLoC

### 4. **Validación Estricta**
- ✅ **Rechazo de emails**: Cualquier campo con `@` es rechazado
- ✅ **Campos email-like**: Se detectan y rechazan automáticamente
- ✅ **Content-Type**: Validación estricta en producción

### 5. **Sin Logs Sensibles**
- ✅ **No logs de emails**: No se registran emails en logs
- ✅ **No logs de OTP**: Los códigos no se registran
- ✅ **Solo TLDs**: Solo se registran dominios para debugging

### 6. **Protección Contra Interceptación**
- ✅ **Limpieza inmediata**: Variables locales se limpian después del uso
- ✅ **Sobrescritura segura**: Datos se sobrescriben antes de eliminar
- ✅ **Garbage collection**: Forzado cuando está disponible
- ✅ **Limpieza de emergencia**: Al cerrar el proceso (SIGINT/SIGTERM)
- ✅ **Logs de seguridad**: Rastreo de todas las limpiezas

## 📊 Flujo de Datos Seguro

```
1. Usuario envía email → 2. Se extrae TLD → 3. Se genera OTP → 4. Se envía email → 5. Se almacena SOLO TLD → 6. Variables locales se limpian
```

### **Datos que SÍ se almacenan temporalmente:**
- `sessionId`: UUID único
- `tld`: Solo el dominio (ej: `gmail.com`)
- `otp`: Código de 6 dígitos (se limpia después de verificación)
- `expiresAt`: Fecha de expiración
- `verified`: Estado de verificación

### **Datos que NUNCA se almacenan:**
- ❌ Email completo
- ❌ Usuario del email
- ❌ Cualquier parte del email antes del `@`
- ❌ Datos personales
- ❌ Información de contacto

## 🔍 Verificación de Seguridad

### **Logs de Seguridad**
El sistema genera logs específicos para verificar la privacidad:
```
🔒 SECURITY: Email NOT stored in session
🔒 SECURITY: Only TLD stored: gmail.com
🔒 SECURITY: Session expires in 10 minutes
🔒 SECURITY: Email sent, local variables cleaned
🔒 SECURITY: OTP cleared after verification
🔒 SECURITY: Session securely cleaned and removed
🔒 SECURITY: Cleaned X expired sessions
🔒 SECURITY: Emergency cleanup - removed X sessions
```

### **Estructura de Sesión**
```typescript
{
  id: "uuid-session-id",
  email: "", // VACÍO - NO se almacena
  tld: "gmail.com", // Solo el dominio
  otp: "123456", // Se limpia después de verificación
  expiresAt: Date, // Se elimina automáticamente
  verified: false
}
```

## 🚨 Amenazas Mitigadas

1. **Exposición de emails**: ❌ Imposible - no se almacenan
2. **Logs de datos sensibles**: ❌ Imposible - no se registran
3. **Cache de respuestas**: ❌ Imposible - headers anti-cache
4. **Tracking**: ❌ Imposible - headers de privacidad
5. **Persistencia**: ❌ Imposible - solo memoria temporal
6. **Query strings**: ❌ Imposible - solo POST con JSON
7. **Interceptación en memoria**: ⚠️ Mitigada - limpieza inmediata y sobrescritura
8. **Memory dumps**: ⚠️ Mitigada - datos se sobrescriben antes de eliminar
9. **Process termination**: ⚠️ Mitigada - limpieza de emergencia automática

## 🧪 Pruebas de Seguridad

### **Test 1: Verificar que no se almacena email**
```bash
# Solicitar OTP
curl -X POST http://localhost:3000/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@gmail.com"}'

# Verificar en logs: "Email NOT stored in session"
```

### **Test 2: Verificar limpieza automática**
```bash
# Esperar 10 minutos y verificar que la sesión se elimina
# Los logs mostrarán: "Cleaned X expired sessions"
```

### **Test 3: Verificar rechazo de emails**
```bash
# Intentar enviar email en campo adicional
curl -X POST http://localhost:3000/check-tld \
  -H "Content-Type: application/json" \
  -d '{"tld": "com", "email": "test@example.com"}'

# Debe devolver: {"error": "email_like_rejected"}
```

### **Test 4: Verificar limpieza de emergencia**
```bash
# Detener el servidor con Ctrl+C
# Debe mostrar: "Emergency cleanup - removed X sessions"
```

## 🔐 Recomendaciones Adicionales

1. **En producción**: Usar Redis con TTL automático
2. **Monitoreo**: Verificar logs de seguridad regularmente
3. **Auditoría**: Revisar código periódicamente
4. **Backup**: No hacer backup de datos de sesión
5. **Servidor seguro**: Acceso restringido al servidor
6. **Network security**: HTTPS obligatorio
7. **Rate limiting**: Prevenir ataques de fuerza bruta

## ⚠️ Limitaciones de Seguridad

### **Vulnerabilidades Potenciales:**
1. **Acceso directo al servidor**: Si alguien tiene acceso root, puede ver memoria
2. **Memory dumps**: En caso de crash del sistema
3. **Process inspection**: Con herramientas de debugging
4. **Core dumps**: Si están habilitados

### **Mitigaciones:**
1. **Limpieza inmediata**: Datos se limpian lo más rápido posible
2. **Sobrescritura**: Datos se sobrescriben antes de eliminar
3. **Expiración rápida**: Solo 10 minutos máximo
4. **Limpieza automática**: Cada 5 minutos
5. **Limpieza de emergencia**: Al cerrar el proceso

## ✅ Conclusión

El sistema garantiza **anonimato total** al:
- Nunca almacenar emails completos
- Solo procesar TLDs extraídos
- Limpiar datos automáticamente y de forma segura
- Rechazar contenido email-like
- No generar logs sensibles
- Proteger contra interceptación en memoria

**El email del usuario permanece completamente anónimo en todo momento, con protección adicional contra interceptación.**
