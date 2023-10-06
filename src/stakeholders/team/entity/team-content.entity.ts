// Path: src/stakeholders/team/entity/team-content.entity.ts
// DESC: team content entity
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsObject, IsString, Validate } from 'class-validator';
import { IdUuidEntity } from '../../../common/entity/id-uuid.entity';
import { EMAIL_MSG } from '../../../common/dto-validation';
import { IsArrayOfIdUuidDTO } from '../../../utils/decorator/IsArrayOfIdUuidDTO.decorator';

export class TeamContentEntity {
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
    description: 'IdUuidEntity of team members in the Team',
    example: [{ ID: 'abc.xyz', UUID: '00000000-0000-0000-0000-000000000000' }],
    type: [IdUuidEntity],
  })
  @Expose({ name: 'members', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  members: IdUuidEntity[];

  @ApiProperty({
    description: 'ID and UUID of the user who is the Product Owner of the Scrum Team (UUID)',
    example: '{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000001"}',
  })
  @Expose({ name: 'productOwner', toPlainOnly: true })
  @IsObject()
  productOwner: IdUuidEntity;

  @ApiProperty({
    description: 'ID and UUID of the user who is the Scrum Master of the Scrum Team (UUID)',
    example: '{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002"}',
  })
  @Expose({ name: 'scrumMaster', toPlainOnly: true })
  @IsObject()
  scrumMaster: IdUuidEntity;

  // @ApiProperty({
  //   description: 'IDs of team members in the Team Metadata (IDs)',
  //   example: ['john.doe'],
  //   type: [String],
  // })
  // @Expose({ name: 'members', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // members: IdUuidEntity[];

  // @ApiProperty({
  //   description: 'IDs of team productOwner in the Team Metadata (ID)',
  //   example: 'john.doe',
  //   type: String,
  // })
  // @Expose({ name: 'productOwner', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // productOwner: IdUuidEntity;

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
    members: IdUuidEntity[],
    productOwner: IdUuidEntity,
    scrumMaster: IdUuidEntity,
  ) {
    this.email = email;
    this.members = members;
    this.productOwner = productOwner;
    this.scrumMaster = scrumMaster;
  }
}

export default TeamContentEntity;
