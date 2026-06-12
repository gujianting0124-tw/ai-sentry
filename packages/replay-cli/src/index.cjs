const sessionName = process.argv[2];
if (!sessionName) {
  console.error("❌ Missing session name. Usage: npm run replay -- <session>");
  process.exit(1);
}
