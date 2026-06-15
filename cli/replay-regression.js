#!/usr/bin/env node

const evaluate = require("../policy/engine");
const baseline = require("../baseline.json");

console.log("\n=== Replay Regression ===");

for (const item of baseline) {
  const out = evaluate(item.input);
  console.log(`Case ${item.id}: ${JSON.stringify(out)}`);
}

console.log("");
