#!/usr/bin/env bash

set -e

cd "$(git rev-parse --show-toplevel)"

AMAZO_PATH="$(realpath $(pwd)/../amazo)"
GOOGLEAPIS_PATH="$(realpath $(pwd)/../googleapis)"
GRPC_TOOLS_PROTOC="$(realpath $(pwd)/node_modules/.bin/grpc_tools_node_protoc)"
PROTOC_GEN_TS="$(realpath $(pwd)/node_modules/ts-protoc-gen/bin/protoc-gen-ts)"

if [ ! -d "$AMAZO_PATH" ]; then
  echo ""
  echo "=> Missing amazo protos directory"
  echo "   You can find it here: https://github.com/uiLibrary/amazo"
  exit 1
fi

if [ ! -d "$GOOGLEAPIS_PATH" ]; then
  echo ""
  echo "=> Missing googleapis directory"
  git clone git@github.com:googleapis/googleapis.git "$GOOGLEAPIS_PATH"
fi

echo ""
echo "=> Compiling generated code"
$GRPC_TOOLS_PROTOC \
  --plugin="protoc-gen-ts=${PROTOC_GEN_TS}" \
  --js_out=import_style=commonjs,binary:generated \
  --ts_out=service=grpc-web:generated \
  --proto_path="$AMAZO_PATH" \
  --proto_path="$GOOGLEAPIS_PATH" \
  "$AMAZO_PATH/protos/catalog/catalog.proto" \
  "$AMAZO_PATH/protos/cms/cms.proto" \
  "$AMAZO_PATH/protos/customers/customers.proto" \
  "$AMAZO_PATH/protos/info/info.proto" \
  "$AMAZO_PATH/protos/shared/money.proto" \
  "$AMAZO_PATH/protos/payments/payments.proto" \
  "$AMAZO_PATH/protos/stores/stores.proto" \
  "$AMAZO_PATH/protos/users/users.proto" \
  "$GOOGLEAPIS_PATH/google/api/annotations.proto" \
  "$GOOGLEAPIS_PATH/google/api/http.proto"
