#!/data/data/com.termux/files/usr/bin/sh

echo "🧠 Running ALL replay sessions..."

for file in sessions/*.json; do
  name=$(basename "$file" .json)
  echo "----------------------------------"
  echo "▶ Replay: $name"
  npm run replay -- "$name" || echo "❌ Replay failed: $name"
done

echo "✅ All sessions replayed."
