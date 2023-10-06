// Path: src/models/team/team-content.dto.ts
// DESC: team content dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsObject, IsString, Validate } from 'class-validator';
import { IdUuidDTO } from '../../../common/dto';
import { EMAIL_MSG } from '../../../common/dto-validation';
import { IsArrayOfIdUuidDTO } from '../../../utils/decorator/IsArrayOfIdUuidDTO.decorator';

export class TeamContentDTO {
  @ApiProperty({
    description: EMAIL_MSG.message,
    example: EMAIL_MSG.example,
  })
  @Expose({ name: 'email', toPlainOnly: true })
  @IsNotEmpty({ message: EMAIL_MSG.requiredMessage })
  @IsString({ message: EMAIL_MSG.typeMessage })
  @IsEmail({}, { message: EMAIL_MSG.errorMessage })
  email: string;

  @ApiProperty({
    description: 'IdUuidDTO of team members in the Team',
    example: [{ ID: 'abc.xyz', UUID: '00000000-0000-0000-0000-000000000000' }],
    type: [IdUuidDTO],
  })
  @Expose({ name: 'members', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  members: IdUuidDTO[];

  @ApiProperty({
    description: 'ID and UUID of the user who is the Product Owner of the Scrum Team (UUID)',
    example: '{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000001"}',
  })
  @Expose({ name: 'productOwner', toPlainOnly: true })
  @IsObject()
  productOwner: IdUuidDTO;

  @ApiProperty({
    description: 'ID and UUID of the user who is the Scrum Master of the Scrum Team (UUID)',
    example: '{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002"}',
  })
  @Expose({ name: 'scrumMaster', toPlainOnly: true })
  @IsObject()
  scrumMaster: IdUuidDTO;

  // @ApiProperty({
  //   description: 'IDs of team members in the Team Metadata (IDs)',
  //   example: ['john.doe'],
  //   type: [String],
  // })
  // @Expose({ name: 'members', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // members: IdUuidDTO[];

  // @ApiProperty({
  //   description: 'IDs of team productOwner in the Team Metadata (ID)',
  //   example: 'john.doe',
  //   type: String,
  // })
  // @Expose({ name: 'productOwner', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // productOwner: IdUuidDTO;

  // @ApiProperty({
  //   description: 'IDs of team scrumMaster in the Team Metadata (ID)',
  //   example: 'john.doe',
  //   type: String,
  // })
  // @Expose({ name: 'scrumMaster', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // scrummMster: string;

  constructor(
    email: string,
    members: IdUuidDTO[],
    productOwner: IdUuidDTO,
    scrumMaster: IdUuidDTO,
  ) {
    this.email = email;
    this.members = members;
    this.productOwner = productOwner;
    this.scrumMaster = scrumMaster;
  }
}

export default TeamContentDTO;
