#!/usr/bin/env bash

echo "🚀 AI Sentry Full System Start"

./update.sh

echo "▶ Running demo..."
npm run demo

echo "▶ Running all replay sessions..."
./multi-replay.sh

echo "🎉 Full system run complete!"
