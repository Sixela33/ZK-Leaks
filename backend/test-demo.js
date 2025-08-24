#!/usr/bin/env node

/**
 * Script de prueba para la demo de hackathon
 * Ejecuta: node test-demo.js
 */

const testEmail = "demo@google.com"; // Cambiado a un dominio público que funcione

async function testDemo() {
  console.log('🚀 === ZK-LEAKS HACKATHON DEMO === 🚀');
  console.log(`📧 Testing email: ${testEmail}`);
  console.log('⏳ Making request to demo endpoint...\n');

  try {
    const response = await fetch('http://localhost:3000/demo-verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ === DEMO SUCCESS === ✅');
      // ❌ ELIMINADO: console.log('📧 Email:', result.demo.email); // BACHE DE SEGURIDAD
      console.log('🌐 Domain:', result.demo.domain);
      console.log('🔗 TLD:', result.demo.tld);
      console.log('📨 MX Records:', result.demo.mxRecords);
      console.log('🔐 SPF Records:', result.demo.spfRecords);
      console.log('✅ Verification Result:', result.demo.verificationResult);
      console.log('⛓️ On-Chain Verified:', result.demo.onChainVerified);
      console.log('⏰ Timestamp:', new Date(result.demo.timestamp).toISOString());
      
      console.log('\n🎉 === ZK PROOF GENERATED === 🎉');
      console.log('🔒 Proof Data Length:', result.zkProof.proofData?.length || 'N/A');
      console.log('📊 Public Data Length:', result.zkProof.publicData?.length || 'N/A');
      console.log('🏷️ Blueprint:', result.zkProof.blueprintSlug);
      console.log('🔐 DKIM Verified:', result.zkProof.dkimVerified);
      
    } else {
      console.log('❌ === DEMO FAILED === ❌');
      console.log('Error:', result.error);
      console.log('Message:', result.message);
    }

  } catch (error) {
    console.error('❌ === REQUEST FAILED === ❌');
    console.error('Error:', error.message);
    console.log('\n💡 Make sure the server is running on port 3000');
    console.log('💡 Run: npm start or node src/index.js');
  }
}

// Ejecutar la prueba
testDemo();
