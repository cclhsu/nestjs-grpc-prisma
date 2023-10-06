import { Module } from '@nestjs/common';

import {
  readArrayFromYAML,
  readSingleFromYAML,
  writeArrayToYAML,
  writeSingleToYAML,
} from './yaml.utils';

@Module({
  providers: [
    {
      provide: 'ReadArrayFromYAML',
      useValue: readArrayFromYAML,
    },
    {
      provide: 'WriteArrayToYAML',
      useValue: writeArrayToYAML,
    },
    {
      provide: 'ReadSingleFromYAML',
      useValue: readSingleFromYAML,
    },
    {
      provide: 'WriteSingleToYAML',
      useValue: writeSingleToYAML,
    },
  ],
  exports: ['ReadArrayFromYAML', 'WriteArrayToYAML', 'ReadSingleFromYAML', 'WriteSingleToYAML'],
})
export class YamlModule {}
