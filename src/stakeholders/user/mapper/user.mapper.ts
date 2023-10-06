// import { UpdateUserRequestDTO } from './../dto/update-user-request.dto';
// import { Injectable } from '@nestjs/common';
// import { plainToInstance, instanceToPlain } from 'class-transformer';
// import { validate, validateSync } from 'class-validator';
// import { User as UserEntity } from '../entities/user.entity';
// import { UserResponseDTO } from '../dto/user-response.dto';
// import {
//   CreateUserRequest,
//   UpdateUserRequestDTO,
//   UserResponse,
// } from '../../../generated/grpc/user.pb';

// @Injectable()
// export class UserMapper {
//   toEntity(dto: UserResponseDTO): UserEntity {
//     const entity = plainToInstance(UserEntity, dto);
//     this.validateEntity(entity);
//     return entity;
//   }

//   toDTO(entity: UserEntity): UserResponseDTO {
//     const dto = instanceToPlain(entity) as UserResponseDTO;
//     this.validateDTO(dto);
//     return dto;
//   }

//   toGrpcEntity(entity: UserEntity): User {
//     const grpcEntity = plainToInstance(User, entity);
//     this.validateGrpcEntity(grpcEntity);
//     return grpcEntity;
//   }

//   toInstance(obj: any): UserEntity {
//     const entity = plainToInstance(UserEntity, obj);
//     this.validateEntity(entity);
//     return entity;
//   }

//   private validateEntity(entity: UserEntity) {
//     const errors = validateSync(entity);
//     if (errors.length > 0) {
//       throw new Error('Entity validation failed');
//     }
//   }

//   private validateDTO(dto: UserResponseDTO) {
//     const errors = validateSync(dto);
//     if (errors.length > 0) {
//       throw new Error('DTO validation failed');
//     }
//   }

//   private validateGrpcEntity(grpcEntity: User) {
//     const errors = validateSync(grpcEntity);
//     if (errors.length > 0) {
//       throw new Error('gRPC entity validation failed');
//     }
//   }
// }
