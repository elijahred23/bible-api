#!/bin/bash

# Specify the path to the .env file
ENV_FILE="api/.env"

# Specify the path to the output text file
OUTPUT_FILE="env_file.txt"

# Export .env file contents to a text file
cat "$ENV_FILE" > "$OUTPUT_FILE"
echo "Contents of $ENV_FILE have been written to $OUTPUT_FILE"

# Start npm run dev in the background
npm run dev &
P1=$!

# Start the Node.js server in the background
node api/server.js &
P2=$!

# Wait for both background processes to finish
wait $P1 $P2
