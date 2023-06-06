#!/usr/bin/env bash

set -e

cd "$(git rev-parse --show-toplevel)"

SOURCE_LOCATION="gs://prod-amazo-translation/i18next/*"
DESTINATION_LOCATION="$(pwd)/public/static/locales/"

mkdir -p "${DESTINATION_LOCATION}"
gsutil -m cp -r "${SOURCE_LOCATION}" "${DESTINATION_LOCATION}"
