module.exports = [
  {
    id: "TI_PHISHING",
    match: (e) =>
      e.action === "email" &&
      /password|reset|verify|account/i.test(e.content),
    decision: "block",
    reason: "phishing_detected"
  },
  {
    id: "TI_DATA_EXFIL",
    match: (e) =>
      e.action === "file" &&
      /dump|export|all data/i.test(e.content),
    decision: "block",
    reason: "data_exfiltration"
  }
];
