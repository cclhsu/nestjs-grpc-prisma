// Path: src/auth/dto/jwt-request.dto.ts
// DESC: DTO for JWT Request
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { JwtPayloadDTO } from './jwt-payload.dto';

export class JwtRequestDTO {
  @ApiProperty({ type: JwtPayloadDTO })
  @IsNotEmpty({ message: 'JWT Payload cannot be empty' })
  @IsObject({ message: 'JWT Payload must be an object' })
  user: JwtPayloadDTO;

  constructor(JwtRequestDTO: JwtRequestDTO) {
    this.user = JwtRequestDTO.user;
  }
}

export default JwtRequestDTO;
