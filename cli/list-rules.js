#!/usr/bin/env node

const general = require("../policy/rules.cjs");
const threatintel = require("../policy/threatintel.cjs");
const dualuse = require("../policy/dualuse.cjs");

function printGroup(name, rules) {
  console.log(`\n=== ${name} ===`);
  for (const rule of rules) {
    console.log(`- ${rule.id}  (${rule.decision})  reason: ${rule.reason}`);
  }
}

printGroup("ThreatIntel", threatintel);
printGroup("Dual-Use", dualuse);
printGroup("General Rules", general);
