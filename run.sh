#!/usr/bin/env bash

echo "🔧 Updating project..."
git pull

echo "📦 Installing dependencies..."
npm install

echo "🚀 Running AI Sentry demo..."
node demo/basic.js

echo "🧠 Running replay session..."
npm run replay -- sess-1
