#!/usr/bin/env node

const evaluate = require("../policy/engine");

if (process.argv.length < 3) {
  console.error("Usage: ./cli/test-rule.js '{\"action\":\"email\",\"content\":\"hello\"}'");
  process.exit(1);
}

try {
  const input = JSON.parse(process.argv[2]);
  const output = evaluate(input);

  console.log("\n=== Test Rule ===");
  console.log("Input:", input);
  console.log("Output:", output);
  console.log("");
} catch (err) {
  console.error("Invalid JSON input.");
  process.exit(1);
}
