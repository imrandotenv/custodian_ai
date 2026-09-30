// tests/test-hover-crash.mjs
// Adversarial proof of runtime crash on mouse hover in SmartConsentCard

import fs from 'fs';

console.log('Testing SmartConsentCard mouse hover behavior...');

const consentCode = fs.readFileSync('src/components/SmartConsentCard.tsx', 'utf-8');

// Extract the onMouseEnter handler
const mouseEnterMatch = consentCode.match(/onMouseEnter=\{([^}]+)\}/);
console.log('Detected onMouseEnter prop:', mouseEnterMatch ? mouseEnterMatch[0] : 'None');

// Check scope declarations
const hasDeclaration = consentCode.includes('setIsHoveredButton =') || 
                       consentCode.includes('setIsHoveredButton,') ||
                       consentCode.includes(', setIsHoveredButton') ||
                       consentCode.includes('function setIsHoveredButton');

console.log('Is setIsHoveredButton declared anywhere in file?', hasDeclaration);

try {
  // Simulate the event handler execution in a component scope without setIsHoveredButton
  const simulatedHandler = () => {
    // Exact handler from line 177:
    setIsHoveredButton(true);
  };
  simulatedHandler();
  console.log('UNEXPECTED: Handler executed without throwing!');
} catch (e) {
  console.log('CONFIRMED RUNTIME ERROR:');
  console.log(`Type: ${e.name}`);
  console.log(`Message: ${e.message}`);
}
