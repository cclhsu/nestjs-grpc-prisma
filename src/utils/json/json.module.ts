import { Module } from '@nestjs/common';
import {
  readArrayFromJSON,
  writeArrayToJSON,
  readSingleFromJSON,
  writeSingleToJSON,
} from './json.utils';

@Module({
  providers: [
    {
      provide: 'ReadArrayFromJSON',
      useValue: readArrayFromJSON,
    },
    {
      provide: 'WriteArrayToJSON',
      useValue: writeArrayToJSON,
    },
    {
      provide: 'ReadSingleFromJSON',
      useValue: readSingleFromJSON,
    },
    {
      provide: 'WriteSingleToJSON',
      useValue: writeSingleToJSON,
    },
  ],
  exports: ['ReadArrayFromJSON', 'WriteArrayToJSON', 'ReadSingleFromJSON', 'WriteSingleToJSON'],
})
export class JsonModule {}
