#!/data/data/com.termux/files/usr/bin/sh

echo "===================="
echo "AI Sentry Test Suite"
echo "===================="

echo ""
echo "[1/3] Checking Node.js..."
node -v >/dev/null 2>&1 && echo "[PASS] Node.js" || { echo "[FAIL] Node.js"; exit 1; }

echo ""
echo "[2/3] Running Kernel Test..."
node test.js && echo "[PASS] Kernel Test" || { echo "[FAIL] Kernel Test"; exit 1; }

echo ""
echo "[3/3] Running Demo..."
node demo/index.cjs && echo "[PASS] Demo" || { echo "[FAIL] Demo"; exit 1; }

echo ""
echo "ALL TESTS PASSED"
