#!/usr/bin/env bash

set -e

cd "$(git rev-parse --show-toplevel)"

SOURCE_DIR="$(pwd)/src/Assets/SVG"
DESTINATION_DIR="$(pwd)/generated/Assets/SVG"

node_modules/.bin/svgr \
  --typescript \
  --svgo-config '{"plugins":[{"removeViewBox":false}]}' \
  -d "$DESTINATION_DIR" \
  "$SOURCE_DIR"
