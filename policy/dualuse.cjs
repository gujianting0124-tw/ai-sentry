module.exports = [
  {
    id: "DU_CODE_EVAL",
    match: (e) =>
      e.action === "code" &&
      /eval|exec|Function\(/i.test(e.content),
    decision: "review",
    reason: "dual_use_risky_code"
  },
  {
    id: "DU_FILE_ACCESS",
    match: (e) =>
      e.action === "file" &&
      /config|system|credential/i.test(e.content),
    decision: "review",
    reason: "dual_use_sensitive_file"
  }
];
