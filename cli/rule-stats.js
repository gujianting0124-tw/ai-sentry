#!/usr/bin/env node

const evaluate = require("../policy/engine");
const fs = require("fs");

const baseline = JSON.parse(fs.readFileSync("baseline.json", "utf8"));

const stats = {};

for (const item of baseline) {
  const out = evaluate(item.input);
  const id = out.ruleId || "DEFAULT";

  stats[id] = (stats[id] || 0) + 1;
}

console.log("\n=== Rule Stats ===");
for (const [rule, count] of Object.entries(stats)) {
  console.log(`${rule}: ${count} hits`);
}
console.log("");
