// Path: src/auth/dto/login-response.dto.ts
// DESC: DTO for Login Response
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDTO {
  @ApiProperty({
    description: 'JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsNotEmpty({ message: 'Token cannot be empty' })
  @IsString({ message: 'Token must be a string' })
  token: string;

  constructor(LoginResponseDTO: LoginResponseDTO) {
    this.token = LoginResponseDTO.token;
  }
}

export default LoginResponseDTO;
