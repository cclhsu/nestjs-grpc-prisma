import { Module } from '@nestjs/common';
import {
  readArrayFromCSV,
  writeArrayToCSV,
  readSingleFromCSV,
  writeSingleToCSV,
} from './csv.utils';

@Module({
  providers: [
    {
      provide: 'ReadArrayFromCSV',
      useValue: readArrayFromCSV,
    },
    {
      provide: 'WriteArrayToCSV',
      useValue: writeArrayToCSV,
    },
    {
      provide: 'ReadSingleFromCSV',
      useValue: readSingleFromCSV,
    },
    {
      provide: 'WriteSingleToCSV',
      useValue: writeSingleToCSV,
    },
  ],
  exports: ['ReadArrayFromCSV', 'WriteArrayToCSV', 'ReadSingleFromCSV', 'WriteSingleToCSV'],
})
export class CsvModule {}
