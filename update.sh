#!/usr/bin/env bash

echo "🔄 Updating AI Sentry..."
git pull

echo "📦 Installing dependencies..."
npm install

echo "🧪 Running test suite..."
./test.sh || { echo "❌ Test failed"; exit 1; }

echo "🧠 Running full replay..."
./multi-replay.sh

echo "✅ Update complete!"
