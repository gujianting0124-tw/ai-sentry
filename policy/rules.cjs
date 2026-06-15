module.exports = [
  {
    id: "GEN_BLOCK_EMAIL",
    match: (e) => e.action === "email",
    decision: "block",
    reason: "default_email_block"
  },
  {
    id: "GEN_ALLOW_SEARCH",
    match: (e) => e.action === "search",
    decision: "allow",
    reason: "default_search_allow"
  }
];
