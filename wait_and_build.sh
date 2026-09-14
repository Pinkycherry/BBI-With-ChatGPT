#!/bin/bash
echo "Waiting for rewrite to finish..."
while pgrep -f "node rewrite_guides_gemini.js" > /dev/null; do
  COUNT=$(find content/guides/ -type f -size +6000c | wc -l)
  echo "Processed >6k: $COUNT / 20. Still running. Waiting 10s..."
  sleep 10
done
echo "Rewrite script finished! Updating data and building..."
node update_guides_data.js
npm run build
