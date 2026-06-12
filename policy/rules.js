module.exports = [
  {
    tool: "email",
    conditions: [
      { field: "riskScore", op: ">", value: 0.2 },
      { field: "input", op: "contains", value: "confidential" }
    ],
    decision: "BLOCK",
    reason: "High-risk confidential email"
  },
  {
    tool: "search",
    conditions: [],
    decision: "ALLOW",
    reason: "Search operations are safe."
  }
];
