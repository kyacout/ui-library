#!/usr/bin/env bash

set -e

cd "$(git rev-parse --show-toplevel)"

NEXT_STATIC_SOURCE_LOCATION="$(pwd)/.next/static/*"
NEXT_STATIC_DESTINATION_LOCATION="gs://prod-amazo-frontend/_next/static"
PUBLIC_SOURCE_LOCATION="$(pwd)/public/*"
PUBLIC_DESTINATION_LOCATION="gs://prod-amazo-frontend"

gsutil \
  -h "Cache-Control:public, max-age=3600" \
  -m \
  cp -r "${NEXT_STATIC_SOURCE_LOCATION}" "${NEXT_STATIC_DESTINATION_LOCATION}"

gsutil \
  -h "Cache-Control:public, max-age=3600" \
  -m \
  cp -r "${PUBLIC_SOURCE_LOCATION}" "${PUBLIC_DESTINATION_LOCATION}"
