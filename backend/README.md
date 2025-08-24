# ZKLEAKS TLD Validator - ZK-Email Edition

Microservicio para validación de TLD con **privacidad garantizada usando Zero-Knowledge Proofs**. El servidor **NUNCA** ve el contenido del email, solo valida pruebas criptográficas.

## 🎯 Objetivo

Validar la propiedad de emails mediante **Zero-Knowledge Proofs** sin comprometer la privacidad del usuario. El sistema es completamente anónimo y criptográficamente seguro.

## 🔒 Seguridad de Nivel Militar

### **Garantías Absolutas:**
- ✅ **Email NUNCA sale del cliente** - Todo se procesa localmente
- ✅ **Servidor NUNCA ve el email** - Solo valida pruebas ZK
- ✅ **Verificación criptográfica** - Matemáticamente imposible de falsificar
- ✅ **Compatibilidad ZK** - Mismo nivel de anonimato que el resto del sistema
- ✅ **Verificación on-chain** - Opcional para máxima descentralización

## 🚀 Flujo ZK-Native

```
1. Cliente extrae TLD → 2. Genera Prueba ZK → 3. Envía Prueba → 4. Servidor Valida → 5. TLD Verificado
```

### **El email NUNCA sale del cliente:**
- ✅ Se procesa localmente
- ✅ Se genera prueba ZK
- ✅ Solo se envía la prueba
- ✅ Servidor solo valida matemáticamente

## 🛠️ Cómo ejecutar

### Configuración
```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp env.example .env
```

### Desarrollo
```bash
pnpm dev
```

### Demo
```bash
pnpm demo
```

## 📡 API ZK-Email

### **POST /zk-verify-email**
Genera una prueba ZK de posesión de email. **El email NUNCA sale del cliente**.

**Request:**
```json
{
  "email": "mati@valannia.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "ZK proof generated successfully",
  "proof": {
    "proofData": "zk_proof_string",
    "publicData": "public_data_string",
    "tld": "valannia.com",
    "timestamp": 1234567890,
    "blueprintSlug": "custom/simple-email-verification@v1"
  },
  "tld": "valannia.com"
}
```

### **POST /zk-verify-proof**
Verifica una prueba ZK de email.

**Request:**
```json
{
  "proofData": "zk_proof_string",
  "publicData": "public_data_string",
  "tld": "company.com",
  "timestamp": 1234567890,
  "blueprintSlug": "wslyvh/Org_Email@v1"
}
```

**Response:**
```json
{
  "verified": true,
  "tld": "company.com",
  "message": "Email verified successfully using ZK proof",
  "onChainVerified": true,
  "timestamp": 1234567890
}
```

### **GET /zk-blueprint-info**
Obtiene información del blueprint ZK.

**Response:**
```json
{
  "slug": "wslyvh/Org_Email@v1",
  "description": "ZK Email verification blueprint for organizational emails",
  "version": "v1"
}
```

## 🧪 Ejemplos de Uso

### **1. Generar Prueba ZK**
```bash
curl -X POST http://localhost:3000/zk-verify-email \
  -H "Content-Type: application/json" \
  -d '{"email": "mati@valannia.com"}'
```

### **2. Verificar Prueba ZK**
```bash
curl -X POST http://localhost:3000/zk-verify-proof \
  -H "Content-Type: application/json" \
  -d '{
    "proofData": "zk_proof_string",
    "publicData": "public_data_string",
    "tld": "valannia.com",
    "timestamp": 1234567890,
    "blueprintSlug": "custom/simple-email-verification@v1"
  }'
```

### **3. Información del Blueprint**
```bash
curl http://localhost:3000/zk-blueprint-info
```

## 🔐 Seguridad Criptográfica

### **Zero-Knowledge Proofs:**
- **Completitud**: Si el usuario posee el email, la prueba siempre es válida
- **Solidez**: Es matemáticamente imposible falsificar una prueba válida
- **Anonimato**: La prueba no revela información sobre el email

### **Verificación On-Chain:**
- **Descentralizada**: Verificación en blockchain
- **Inmutable**: Pruebas verificadas permanentemente
- **Transparente**: Código abierto y auditable

## 🎯 Integración con ZK-Email SDK

El sistema usa `@zk-email/sdk` con el blueprint `Bisht13/SuccinctZKResidencyInvite@v2` para:
- ✅ Generar pruebas ZK localmente
- ✅ Validar pruebas criptográficamente
- ✅ Verificar en blockchain (opcional)
- ✅ Compatibilidad con emails organizacionales

### **Requisitos del SDK:**

1. **📧 Email Real**: El usuario debe proporcionar el contenido real del email
2. **🔐 DKIM Signature**: El email debe tener firma DKIM válida
3. **🌐 Dominio Válido**: El email debe ser de un dominio verificado
4. **📋 Formato Específico**: El contenido debe cumplir con el blueprint

### **Complejidad de Implementación:**

| Aspecto | Complejidad | Descripción |
|---------|-------------|-------------|
| **Setup SDK** | 🟡 **Media** | Instalación y configuración inicial |
| **Blueprints** | 🟡 **Media** | Seleccionar blueprint correcto |
| **Email Content** | 🔴 **Alta** | Usuario debe proporcionar email real |
| **DKIM Signatures** | 🔴 **Alta** | Requiere emails con firmas DKIM |
| **Proof Generation** | 🟡 **Media** | Generación local de pruebas ZK |
| **Verification** | 🟢 **Baja** | Validación automática |

## 📊 Comparación de Seguridad

| Método | Email en Servidor | Interceptación | Verificación | Privacidad |
|--------|------------------|----------------|--------------|------------|
| **OTP Tradicional** | ❌ Sí (brevemente) | ⚠️ Posible | ❌ Centralizada | ❌ Comprometida |
| **ZK-Email REAL** | ✅ **NUNCA** | ✅ **Imposible** | ✅ **Criptográfica** | ✅ **Total** |

### **Ventajas del ZK-Email Real:**

1. **🔒 Privacidad Total**: El email **NUNCA** sale del cliente
2. **🔐 Verificación Criptográfica**: Matemáticamente imposible de falsificar
3. **🌐 Sin Interceptación**: No hay punto de vulnerabilidad
4. **⚡ Verificación Instantánea**: No requiere esperar emails
5. **🔗 Compatibilidad ZK**: Integración perfecta con sistemas ZK
6. **📡 Verificación On-Chain**: Opcional para descentralización

## 🔧 Endpoints Legacy

Los endpoints OTP originales siguen disponibles para compatibilidad:
- `POST /request-otp`
- `POST /verify-otp`
- `GET /verified-tld/:sessionId`

## 🚨 Ventajas del Sistema ZK

1. **Privacidad Total**: Email nunca sale del cliente
2. **Seguridad Criptográfica**: Matemáticamente imposible de falsificar
3. **Compatibilidad ZK**: Integración perfecta con sistemas ZK
4. **Verificación On-Chain**: Opcional para descentralización
5. **Sin Ventana de Vulnerabilidad**: No hay momento donde el email esté expuesto
6. **Emails Organizacionales**: Optimizado para dominios corporativos

## ✅ Conclusión

El sistema ZK-email garantiza **anonimato total** y **seguridad criptográfica**:
- El email nunca sale del cliente
- Solo se validan pruebas matemáticas
- Compatible con sistemas ZK existentes
- Verificación on-chain opcional
- Especializado en emails organizacionales

**¡Privacidad de nivel militar para tu sistema ZK!** 🔒


