#!/data/data/com.termux/files/usr/bin/bash

while true; do
  clear
  echo "==============================="
  echo "      AI Sentry Policy UI"
  echo "==============================="
  echo "1) List Rules"
  echo "2) Test Rule"
  echo "3) Show Baseline"
  echo "4) Show Current"
  echo "5) Diff Baseline vs Current"
  echo "6) Exit"
  echo "-------------------------------"
  read -p "Select option: " opt

  case $opt in
    1)
      ./cli/list-rules.js
      read -p "Press Enter to continue..."
      ;;
    2)
      read -p "Enter JSON event: " event
      ./cli/test-rule.js "$event"
      read -p "Press Enter to continue..."
      ;;
    3)
      cat baseline.json
      read -p "Press Enter to continue..."
      ;;
    4)
      node test/run-policy-tests.js > current.json
      cat current.json
      read -p "Press Enter to continue..."
      ;;
    5)
      node test/run-policy-tests.js > current.json
      diff baseline.json current.json || true
      read -p "Press Enter to continue..."
      ;;
    6)
      exit 0
      ;;
    *)
      echo "Invalid option"
      sleep 1
      ;;
  esac
done
