#!/usr/bin/env bash

echo "🧠 Running ALL replay sessions..."

for file in sessions/*.json; do
  name=$(basename "$file" .json)
  echo "----------------------------------"
  echo "▶ Replay: $name"
  npm run replay -- "$name"
done

echo "✅ All sessions replayed."
