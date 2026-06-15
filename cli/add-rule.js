#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../policy/rules.cjs");
const rules = require("../policy/rules.cjs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(q) {
  return new Promise(res => readline.question(q, res));
}

(async () => {
  console.log("\n=== Add New Rule ===");

  const id = await ask("Rule ID: ");
  const action = await ask("Match action (email/search/code/file/...): ");
  const decision = await ask("Decision (allow/block/review): ");
  const reason = await ask("Reason: ");

  const newRule = {
    id,
    match: `(e) => e.action === "${action}"`,
    decision,
    reason
  };

  // Convert match back to function after writing
  const updated = `
module.exports = [
${rules
  .map(r => `  {
    id: "${r.id}",
    match: ${r.match.toString()},
    decision: "${r.decision}",
    reason: "${r.reason}"
  },`)
  .join("\n")}
  {
    id: "${newRule.id}",
    match: ${newRule.match},
    decision: "${newRule.decision}",
    reason: "${newRule.reason}"
  }
];
`;

  fs.writeFileSync(file, updated);
  console.log("\nRule added!");
  readline.close();
})();
