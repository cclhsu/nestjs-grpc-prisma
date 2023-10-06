// Path: src/stakeholders/team/dto/team-content.dto.ts
// DESC: team content dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { TeamResponseDTO } from './team-response.dto';

export class ListTeamResponseDTO {
  @ApiProperty({
    description: 'An array of team DTOs.',
    type: () => TeamResponseDTO,
    isArray: true,
  })
  @Expose({ name: 'teams', toPlainOnly: true })
  @IsArray()
  @ValidateNested({ each: true })
  teams: TeamResponseDTO[];

  constructor(teams: TeamResponseDTO[]) {
    this.teams = teams;
  }
}

export default ListTeamResponseDTO;
