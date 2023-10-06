#!/bin/bash

# https://docs.nestjs.com/microservices/grpc
# https://github.com/nestjs/nest/tree/master/sample/04-grpc
# https://github.com/stephenh/ts-proto
# https://github.com/stephenh/ts-proto/blob/main/NESTJS.markdown
# https://github.com/grpc/grpc-node
# npm run generate:proto -- --protoPath=./ --outDir=./src/generated --addGrpcMetadata=true ./example.proto

# ./api/grpc/generate-typings.sh

# Path to this plugin
PROTO_DIR="api/grpc/proto"                                       # Path to your proto files
PROTOC_PATH=./node_modules/.bin/grpc_tools_node_protoc           # ./node_modules/.bin/grpc_tools_node_protoc | $(which grpc_tools_node_protoc)
PROTOC_GEN_TS_PROTO_PATH=./node_modules/.bin/protoc-gen-ts_proto # ./node_modules/.bin/protoc-gen-ts_proto | $(which protoc-gen-ts_proto)

# PROTOS=(
#     $(
#         cd ${PROTO_DIR}
#         ls *.proto | sort
#     )
# )

# if [ "$#" -gt "0" ]; then
#     PROTOS=("$@")
# fi

# Define an array of proto configurations
# protoConfiguration=(
# #   "api/grpc/proto/proto.proto:src/grpc/generated"
#   "api/grpc/proto/common.proto:src/common/grpc/generated"
#   "api/grpc/proto/auth.proto:src/auth/grpc/generated"
#   "api/grpc/proto/user.proto:src/stakeholders/user/grpc/generated"
#   "api/grpc/proto/team.proto:src/stakeholders/team/grpc/generated"
#   "api/grpc/proto/hello.proto:src/hello/grpc/generated"
#   "api/grpc/proto/health.proto:src/health/grpc/generated"
# )

protoConfiguration=(
    #   "api/grpc/proto/proto.proto:generated/grpc"
    "api/grpc/proto/common.proto:generated/grpc/common"
    "api/grpc/proto/auth.proto:generated/grpc/auth"
    "api/grpc/proto/user.proto:generated/grpc/stakeholders/user"
    "api/grpc/proto/team.proto:generated/grpc/stakeholders/team"
    "api/grpc/proto/hello.proto:generated/grpc/hello"
    "api/grpc/proto/health.proto:generated/grpc/health"
)

echo "Protos:"
printf "%s\n" "${protoConfiguration[@]}"
echo "Generating proto typings..."

# Populate the output directory with generated typings
for protoConfig in "${protoConfiguration[@]}"; do
    protoFile="${protoConfig%%:*}"
    outputDir="${protoConfig##*:}"
    protoName=$(basename "$protoFile" | cut -d'.' -f1)

    rm -rf ${outputDir}
    mkdir -p ${outputDir}

    echo "protoFile: ${protoFile}"

    if [ -n "$protoName" ]; then
        # npx grpc_tools_node_protoc \
        #     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PROTO_PATH}" \
        #     --ts_opt=nestJs=true \
        #     --ts_opt=addGrpcMetadata=true \
        #     --ts_opt=addNestjsRestParameter=true \
        #     --ts_out=import_style=commonjs,binary,grpc_js:${outputDir} \
        #     --ts_opt=fileSuffix=.pb \
        #     --proto_path=${PROTO_DIR} \
        #     --proto_path=${PROTO_DIR}/google/api \
        #     --proto_path=${PROTO_DIR}/google/protobuf \
        #     -I ${PROTO_DIR}/google/api/*.proto \
        #     -I ${PROTO_DIR}/google/protobuf/*.proto \
        #     ${PROTO_DIR}/${PROTO}

        npx grpc_tools_node_protoc \
            --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PROTO_PATH} \
            --ts_opt=nestJs=true \
            --ts_opt=addGrpcMetadata=true \
            --ts_opt=addNestjsRestParameter=true \
            --ts_opt=fileSuffix=.pb \
            --ts_out=${outputDir} \
            --proto_path=${PROTO_DIR} \
            ${protoFile}

        echo "Generated typings for ${protoName} in ${outputDir}"
    else
        echo "Error: protoName is undefined for ${protoFile}"
    fi
done

echo "gRPC typings generated successfully!"
