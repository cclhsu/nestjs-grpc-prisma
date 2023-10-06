import { Module } from '@nestjs/common';
import {
  readArrayFromMarkdown,
  writeArrayToMarkdown,
  readSingleFromMarkdown,
  writeSingleToMarkdown,
} from './markdown.utils';

@Module({
  providers: [
    {
      provide: 'ReadArrayFromMarkdown',
      useValue: readArrayFromMarkdown,
    },
    {
      provide: 'WriteArrayToMarkdown',
      useValue: writeArrayToMarkdown,
    },
    {
      provide: 'ReadSingleFromMarkdown',
      useValue: readSingleFromMarkdown,
    },
    {
      provide: 'WriteSingleToMarkdown',
      useValue: writeSingleToMarkdown,
    },
  ],
  exports: [
    'ReadArrayFromMarkdown',
    'WriteArrayToMarkdown',
    'ReadSingleFromMarkdown',
    'WriteSingleToMarkdown',
  ],
})
export class MarkdownModule {}
