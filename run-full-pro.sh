#!/data/data/com.termux/files/usr/bin/sh

START=$(date +%s)

echo "🚀 AI Sentry v0.3 — Full System Pipeline"

./update.sh

echo "▶ Running demo..."
npm run demo

echo "▶ Running all replay sessions..."
./multi-replay.sh

END=$(date +%s)
DIFF=$((END - START))

echo "⏱ Total time: ${DIFF}s"
echo "🎉 AI Sentry v0.3 — Full pipeline complete!"
