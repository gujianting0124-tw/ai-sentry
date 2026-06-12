export function decide(event) {
  if (event.action === "email") return "BLOCK";
  return "ALLOW";
}
