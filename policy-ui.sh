#!/data/data/com.termux/files/usr/bin/bash

while true; do
  clear
  echo "==============================="
  echo "      AI Sentry Policy UI v2"
  echo "==============================="
  echo "1) List Rules"
  echo "2) Test Rule"
  echo "3) Show Baseline"
  echo "4) Show Current"
  echo "5) Diff Baseline vs Current"
  echo "6) Rule Stats"
  echo "7) Replay Regression"
  echo "8) Add Rule"
  echo "9) Exit"
  echo "-------------------------------"
  read -p "Select option: " opt

  case $opt in
    1) ./cli/list-rules.js ;;
    2) read -p "Enter JSON event: " event; ./cli/test-rule.js "$event" ;;
    3) cat baseline.json ;;
    4) node test/run-policy-tests.js > current.json; cat current.json ;;
    5) node test/run-policy-tests.js > current.json; diff baseline.json current.json || true ;;
    6) ./cli/rule-stats.js ;;
    7) ./cli/replay-regression.js ;;
    8) ./cli/add-rule.js ;;
    9) exit 0 ;;
    *) echo "Invalid option";;
  esac

  read -p "Press Enter to continue..."
done
