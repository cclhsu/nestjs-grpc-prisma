// Path: src/models/hello/hello-json-response.dto.ts
// DESC: hello json response dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DataDTO {
  @ApiProperty()
  @IsString()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class HelloJsonResponseDTO {
  @ApiProperty({ type: DataDTO, required: false })
  data: DataDTO;

  constructor(data: DataDTO) {
    this.data = data;
  }
}

export default HelloJsonResponseDTO;
