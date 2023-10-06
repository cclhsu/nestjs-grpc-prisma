#!/usr/bin/env node
// Path: api/grpc/proto/generate-typings.ts
// DESC: Generate gRPC typings from proto files
'use strict'
// https://docs.nestjs.com/microservices/grpc
// https://github.com/nestjs/nest/tree/master/sample/04-grpc
// https://github.com/stephenh/ts-proto
// https://github.com/stephenh/ts-proto/blob/main/NESTJS.markdown
// https://github.com/grpc/grpc-node
// npm run generate:proto -- --protoPath=./ --outDir=./src/generated --addGrpcMetadata=true ./example.proto

// npx ts-node ./api/grpc/generate-typings.ts

import { execSync } from 'child_process';

const PROTO_DIR = 'api/grpc/proto'; // Path to your proto files
const PROTOC_PATH = './node_modules/.bin/grpc_tools_node_protoc'; // './node_modules/.bin/grpc_tools_node_protoc' | $(which grpc_tools_node_protoc)
const PROTOC_GEN_TS_PROTO_PATH = './node_modules/.bin/protoc-gen-ts_proto'; // './node_modules/.bin/protoc-gen-ts_proto' | $(which protoc-gen-ts_proto)

// const PROTOS = [
//   ...execSync(`cd ${PROTO_DIR} && ls *.proto | sort`)
//     .toString()
//     .split('\n')
//     .filter(Boolean),
// ];

const protoConfigurations: {
  protoFile: string;
  outputDir: string;
}[] = [
  // {
  //   protoFile: 'api/grpc/proto/proto.proto',
  //   outputDir: 'src/grpc/generated',
  //   // outputDir: 'generated/grpc',
  // },
  {
    protoFile: 'api/grpc/proto/common.proto',
    // outputDir: 'src/common/grpc/generated',
    outputDir: 'generated/grpc/common',
  },
  {
    protoFile: 'api/grpc/proto/auth.proto',
    // outputDir: 'src/auth/grpc/generated',
    outputDir: 'generated/grpc/auth',
  },
  {
    protoFile: 'api/grpc/proto/user.proto',
    // outputDir: 'src/stakeholders/user/grpc/generated',
    outputDir: 'generated/grpc/stakeholders/user',
  },
  {
    protoFile: 'api/grpc/proto/team.proto',
    // outputDir: 'src/stakeholders/team/grpc/generated',
    outputDir: 'generated/grpc/stakeholders/team',
  },
  {
    protoFile: 'api/grpc/proto/hello.proto',
    // outputDir: 'src/hello/grpc/generated',
    outputDir: 'generated/grpc/hello',
  },
  {
    protoFile: 'api/grpc/proto/health.proto',
    // outputDir: 'src/health/grpc/generated',
    outputDir: 'generated/grpc/health',
  },
];

console.log('Protos:');
console.log(protoConfigurations);
console.log('Generating proto typings...');

// Populate the output directory with generated typings
for (const protoConfig of protoConfigurations) {
  const { protoFile, outputDir } = protoConfig;
  const protoName: string | undefined = protoFile.split('/').pop()?.split('.')[0];

  // if not exit outputDir then create it
  execSync(`rm -rf ${outputDir}`);
  execSync(`mkdir -p ${outputDir}`);

  if (protoName) {
    // execSync(
    //   `${PROTOC_PATH} \
    //     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PROTO_PATH}" \
    //     --ts_opt=nestJs=true \
    //     --ts_opt=addGrpcMetadata=true \
    //     --ts_opt=addNestjsRestParameter=true \
    //     --ts_out=import_style=commonjs,binary,grpc_js:${outputDir} \
    //     --ts_opt=fileSuffix=.pb \
    //     --proto_path=${PROTO_DIR} \
    //     --proto_path=${PROTO_DIR}/google/api \
    //     --proto_path=${PROTO_DIR}/google/protobuf \
    //     -I ${PROTO_DIR}/google/api/*.proto \
    //     -I ${PROTO_DIR}/google/protobuf/*.proto \
    //     ${PROTO_DIR}/${protoFile}`,
    // );

    execSync(
      `${PROTOC_PATH} \
        --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PROTO_PATH} \
        --ts_opt=nestJs=true \
        --ts_opt=addGrpcMetadata=true \
        --ts_opt=addNestjsRestParameter=true \
        --ts_opt=fileSuffix=.pb \
        --ts_out=${outputDir} \
        --proto_path=${PROTO_DIR} \
        ${protoFile}`,
    );

    console.log(`Generated typings for ${protoName} in ${outputDir}`);
  } else {
    console.error(`Error: protoName is undefined for ${protoFile}`);
  }
}

console.log('gRPC typings generated successfully!');

export default {}; // Export an empty object to satisfy TypeScrip
