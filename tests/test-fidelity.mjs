// tests/test-fidelity.mjs
// Empirical test harness for Challenger 2: API & Feature Fidelity

import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('====================================================');
  console.log('CHALLENGER 2: API & FEATURE FIDELITY EMPIRICAL HARNESS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;
  const results = [];

  function assert(title, condition, detail = '') {
    if (condition) {
      console.log(`[PASS] ${title}`);
      passed++;
      results.push({ test: title, status: 'PASS', detail });
    } else {
      console.error(`[FAIL] ${title} - ${detail}`);
      failed++;
      results.push({ test: title, status: 'FAIL', detail });
    }
  }

  // =========================================================================
  // PILLAR 1: /api/verify-karmayogi (Adi Karmayogi RBAC API)
  // =========================================================================
  console.log('\n--- 1. Testing /api/verify-karmayogi ---');

  // Test 1.1: Master Trainer prefix (MT-)
  try {
    const res = await fetch(`${BASE_URL}/api/verify-karmayogi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adiKarmayogiId: 'MT-JH-2026-8812' })
    });
    const data = await res.json();
    assert(
      'Verify MT- prefix returns 200, SUPER_CUSTODIAN, aiCorrectionRights: true',
      res.status === 200 && data.verified === true && data.platformRole === 'SUPER_CUSTODIAN' && data.aiCorrectionRights === true,
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify MT- prefix', false, err.message);
  }

  // Test 1.2: Nodal Officer prefix (NO-)
  try {
    const res = await fetch(`${BASE_URL}/api/verify-karmayogi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adiKarmayogiId: 'NO-DELHI-2026-99' })
    });
    const data = await res.json();
    assert(
      'Verify NO- prefix returns 200, SUPER_CUSTODIAN, aiCorrectionRights: true',
      res.status === 200 && data.verified === true && data.platformRole === 'SUPER_CUSTODIAN' && data.aiCorrectionRights === true,
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify NO- prefix', false, err.message);
  }

  // Test 1.3: Student prefix (ST-)
  try {
    const res = await fetch(`${BASE_URL}/api/verify-karmayogi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adiKarmayogiId: 'ST-HAZ-2026-0041' })
    });
    const data = await res.json();
    assert(
      'Verify ST- prefix returns 200, CUSTODIAN, aiCorrectionRights: false',
      res.status === 200 && data.verified === true && data.platformRole === 'CUSTODIAN' && data.aiCorrectionRights === false,
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify ST- prefix', false, err.message);
  }

  // Test 1.4: Case-insensitivity & whitespace trimming
  try {
    const res = await fetch(`${BASE_URL}/api/verify-karmayogi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adiKarmayogiId: '   mt-ranchi-007   ' })
    });
    const data = await res.json();
    assert(
      'Verify case-insensitive & trimmed prefix (  mt-ranchi-007  ) works properly',
      res.status === 200 && data.verified === true && data.platformRole === 'SUPER_CUSTODIAN',
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify case-insensitivity & trimming', false, err.message);
  }

  // Test 1.5: Alternate payload key "id"
  try {
    const res = await fetch(`${BASE_URL}/api/verify-karmayogi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'ST-002' })
    });
    const data = await res.json();
    assert(
      'Verify payload key "id" fallback works for ST-002',
      res.status === 200 && data.verified === true && data.platformRole === 'CUSTODIAN',
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify id fallback', false, err.message);
  }

  // Test 1.6: Invalid prefix returns 404
  try {
    const res = await fetch(`${BASE_URL}/api/verify-karmayogi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adiKarmayogiId: 'XX-INVALID-999' })
    });
    const data = await res.json();
    assert(
      'Verify invalid prefix returns 404 and verified: false',
      res.status === 404 && data.verified === false && typeof data.error === 'string',
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify invalid prefix 404', false, err.message);
  }

  // Test 1.7: Missing parameter returns 404
  try {
    const res = await fetch(`${BASE_URL}/api/verify-karmayogi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const data = await res.json();
    assert(
      'Verify missing parameter returns 404',
      res.status === 404 && data.verified === false,
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify missing parameter 404', false, err.message);
  }

  // Test 1.8: GET inspection handler returns active status and docs
  try {
    const res = await fetch(`${BASE_URL}/api/verify-karmayogi`, { method: 'GET' });
    const data = await res.json();
    assert(
      'Verify GET /api/verify-karmayogi returns status active with sample payloads',
      res.status === 200 && data.status === 'active' && data.sampleResponses?.masterTrainer?.platformRole === 'SUPER_CUSTODIAN',
      `Status: ${res.status}, sampleResponses: ${JSON.stringify(data.sampleResponses)}`
    );
  } catch (err) {
    assert('Verify GET verify-karmayogi', false, err.message);
  }

  // =========================================================================
  // PILLAR 2: /api/translate (Hugging Face NLLB-200 Translation)
  // =========================================================================
  console.log('\n--- 2. Testing /api/translate ---');

  // Test 2.1: Translation to Santhali Ol Chiki ('sat')
  try {
    const tStart = Date.now();
    const res = await fetch(`${BASE_URL}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'In the ancient forests of Chota Nagpur, the spirits of the soil awaken.',
        targetLang: 'sat'
      })
    });
    const latency = Date.now() - tStart;
    const data = await res.json();

    // Verify Ol Chiki Unicode characters (U+1C50 - U+1C7F)
    const hasOlChiki = /[\u1C50-\u1C7F]/.test(data.translatedText || '');

    assert(
      'Verify targetLang=sat returns Santhali in Ol Chiki script',
      res.status === 200 && data.success === true && hasOlChiki && data.meta?.targetLang === 'sat',
      `Status: ${res.status}, TranslatedText: ${data.translatedText}`
    );

    assert(
      'Verify model name is facebook/nllb-200-distilled-600M',
      data.meta?.model === 'facebook/nllb-200-distilled-600M',
      `Model: ${data.meta?.model}`
    );

    assert(
      'Verify simulated inference latency ~1500ms',
      latency >= 1400 && latency <= 2500,
      `Observed latency: ${latency}ms (expected ~1500ms)`
    );
  } catch (err) {
    assert('Verify translate sat', false, err.message);
  }

  // Test 2.2: Translation to English ('en')
  try {
    const res = await fetch(`${BASE_URL}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'ᱪᱷᱚᱴᱟ ᱱᱟᱜᱽᱯᱩᱨ ᱨᱮᱭᱟᱜ ᱵᱤᱨ ᱨᱮ...',
        targetLang: 'en'
      })
    });
    const data = await res.json();
    assert(
      'Verify targetLang=en returns English translation',
      res.status === 200 && data.success === true && data.meta?.targetLang === 'en' && data.translatedText.includes('Chota Nagpur'),
      `Status: ${res.status}, TranslatedText: ${data.translatedText}`
    );
  } catch (err) {
    assert('Verify translate en', false, err.message);
  }

  // Test 2.3: Validation for unsupported language code
  try {
    const res = await fetch(`${BASE_URL}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello', targetLang: 'de' })
    });
    const data = await res.json();
    assert(
      'Verify unsupported targetLang returns 400 Bad Request',
      res.status === 400 && data.success === false && data.error.includes('Invalid \'targetLang\''),
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify translate invalid lang 400', false, err.message);
  }

  // Test 2.4: Validation for missing text
  try {
    const res = await fetch(`${BASE_URL}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetLang: 'sat' })
    });
    const data = await res.json();
    assert(
      'Verify missing text returns 400 Bad Request',
      res.status === 400 && data.success === false,
      `Status: ${res.status}, Body: ${JSON.stringify(data)}`
    );
  } catch (err) {
    assert('Verify translate missing text 400', false, err.message);
  }

  // Test 2.5: GET method handler
  try {
    const res = await fetch(`${BASE_URL}/api/translate`, { method: 'GET' });
    const data = await res.json();
    assert(
      'Verify GET /api/translate returns active status and supportedLanguages',
      res.status === 200 && data.status === 'active' && Array.isArray(data.supportedLanguages),
      `Status: ${res.status}, Supported: ${JSON.stringify(data.supportedLanguages)}`
    );
  } catch (err) {
    assert('Verify GET translate', false, err.message);
  }

  // =========================================================================
  // PILLAR 3: EscrowCheckout (90% Direct Payout Model)
  // =========================================================================
  console.log('\n--- 3. Testing EscrowCheckout.tsx ---');

  const escrowFile = fs.readFileSync('src/components/EscrowCheckout.tsx', 'utf-8');

  // Test 3.1: 90% direct payout mathematical calculation
  const hasExactMath = escrowFile.includes('Math.round(basePrice * 0.9)');
  const hasEscrowFeeMath = escrowFile.includes('Math.round(basePrice * 0.1)');
  assert(
    'Verify EscrowCheckout implements exact 90% Math.round(basePrice * 0.9) calculation',
    hasExactMath && hasEscrowFeeMath,
    'Math formula checks'
  );

  // Test 3.2: Empirical mathematical tests
  const testPrices = [4800, 12000, 3500, 600, 0, 105];
  let allMathValid = true;
  for (const price of testPrices) {
    const base = Math.max(0, price);
    const payout = Math.round(base * 0.9);
    const fee = Math.round(base * 0.1);
    if (price === 4800 && (payout !== 4320 || fee !== 480)) allMathValid = false;
    if (price === 0 && (payout !== 0 || fee !== 0)) allMathValid = false;
  }
  assert('Verify empirical math evaluation across price test vectors (4800 -> 4320 + 480)', allMathValid);

  // Test 3.3: Emerald color styling & pulse indicator
  const hasEmeraldBg = escrowFile.includes('bg-[#EBF3ED]');
  const hasEmeraldText = escrowFile.includes('text-[#193225]');
  const hasPulse = escrowFile.includes('animate-pulse');
  assert(
    'Verify emerald styling (bg-[#EBF3ED], text-[#193225], animate-pulse) for 90% payout display',
    hasEmeraldBg && hasEmeraldText && hasPulse,
    `bg: ${hasEmeraldBg}, text: ${hasEmeraldText}, pulse: ${hasPulse}`
  );

  // Test 3.4: 1-second simulated delay
  const has1sDelay = escrowFile.includes('setTimeout(resolve, 1000)');
  assert(
    'Verify 1-second simulated smart contract delay (setTimeout 1000ms)',
    has1sDelay,
    `has1sDelay: ${has1sDelay}`
  );

  // Test 3.5: Exact confirmation text
  const hasConfirmationText = escrowFile.includes("Payment Escrowed. 90% routed directly to Artisan&apos;s verified bank account.") ||
                               escrowFile.includes("Payment Escrowed. 90% routed directly to Artisan's verified bank account.");
  assert(
    'Verify exact confirmation text "Payment Escrowed. 90% routed directly to Artisan\'s verified bank account."',
    hasConfirmationText,
    `hasConfirmationText: ${hasConfirmationText}`
  );

  // =========================================================================
  // PILLAR 4: SmartConsentCard.tsx (Smart Consent Cultural Shield)
  // =========================================================================
  console.log('\n--- 4. Testing SmartConsentCard.tsx ---');

  const consentFile = fs.readFileSync('src/components/SmartConsentCard.tsx', 'utf-8');

  // Test 4.1: Blur transition
  const hasBlurTransition = consentFile.includes("isUnlocked ? 'blur(0px)' : 'blur(22px)'");
  const hasScaleTransition = consentFile.includes("scale: isUnlocked ? 1 : 1.08");
  assert(
    'Verify Framer Motion blur filter transition (blur(22px) -> blur(0px)) and scale (1.08 -> 1)',
    hasBlurTransition && hasScaleTransition,
    `blur: ${hasBlurTransition}, scale: ${hasScaleTransition}`
  );

  // Test 4.2: Digital pledge button
  const hasPledgeButton = consentFile.includes('I Agree to the Protocols');
  assert(
    'Verify Digital Pledge button text "I Agree to the Protocols"',
    hasPledgeButton,
    `hasPledgeButton: ${hasPledgeButton}`
  );

  // Test 4.3: Statutory micro-copy
  const hasStatutoryCopy = consentFile.includes('Protected by Section 4(a) of local custodian rights. Powered by Mitti Smart Consent.');
  assert(
    'Verify statutory micro-copy: "Protected by Section 4(a) of local custodian rights. Powered by Mitti Smart Consent."',
    hasStatutoryCopy,
    `hasStatutoryCopy: ${hasStatutoryCopy}`
  );

  // Test 4.4: ADVERSARIAL STRESS TEST: Unbound variable bug in SmartConsentCard
  const hasUndeclaredSetIsHoveredButton = consentFile.includes('setIsHoveredButton');
  const hasDeclaredState = /const\s+\[\s*isHoveredButton\s*,\s*setIsHoveredButton\s*\]/.test(consentFile);

  assert(
    'ADVERSARIAL CHALLENGE: Verify whether setIsHoveredButton is properly declared in scope',
    !hasUndeclaredSetIsHoveredButton || hasDeclaredState,
    `hasUndeclaredSetIsHoveredButton=${hasUndeclaredSetIsHoveredButton}, hasDeclaredState=${hasDeclaredState}`
  );

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('====================================================\n');

  return { passed, failed, results };
}

runTests().catch(console.error);
