#!/bin/bash

for file in *.glb; do
  # Ensure the file exists and is not an already transformed glb file
  if [ -e "$file" ] && [[ "$file" != *-transformed.glb ]]; then
    echo "Processing file: $file"
    # Remove underscores from the filename
    tsx_file_name="${file//_/}"
    # Replace the glb with tsx extension
    tsx_file_name="${tsx_file_name%.glb}.tsx"
    npx gltfjsx $file --transform -o $tsx_file_name -t
  fi
done