module.exports = [
  {
    match: (e) => e.action === "email",
    decision: "block"
  },
  {
    match: (e) => e.action === "search",
    decision: "allow"
  }
];
