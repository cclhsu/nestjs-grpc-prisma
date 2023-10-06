// Path: src/stakeholders/team/repository/prisma-postgres-team.repository.ts
// DESC: Implement the Prisma strategy for the team repository
'use strict';
import { Logger, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  PrismaClient,
  CommonDateEntity as PrismaCommonDateEntity,
  IdUuidEntity as PrismaIdUuidEntity,
  TeamContentEntity as PrismaTeamContentTeamEntity,
  TeamEntity as PrismaTeamEntity,
  TeamMetadataEntity as PrismaTeamMetadataTeamEntity,
} from '../../../../generated/prisma/postgres/client';
import { CommonDateDTO } from '../../../common/dto';
import { CommonDateEntity, IdUuidEntity } from '../../../common/entity';
import {
  CreateTeamRequestDTO,
  TeamContentDTO,
  TeamIdUuidDTO,
  TeamMetadataDTO,
  UpdateTeamRequestDTO,
} from '../dto';
import { TeamContentEntity, TeamEntity, TeamMetadataEntity } from '../entity';
import { TeamRepositoryInterface } from './team-repository.interface';

export class PrismaPostgresTeamRepository implements TeamRepositoryInterface {
  private readonly logger: Logger = new Logger(PrismaPostgresTeamRepository.name);
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]> {
    const prismaTeamEntities: PrismaTeamEntity[] | null = await this.prisma.teamEntity.findMany();
    if (!prismaTeamEntities || prismaTeamEntities.length === 0) {
      throw new NotFoundException('No teams found');
    }

    const teamIdUuidDTOs: TeamIdUuidDTO[] = prismaTeamEntities.map((prismaTeamEntity) => {
      if (!prismaTeamEntity) {
        throw new NotFoundException('Invalid team data found');
      }
      return new TeamIdUuidDTO(prismaTeamEntity.UUID, prismaTeamEntity.ID);
    });

    return teamIdUuidDTOs;
  }

  async listTeams(): Promise<TeamEntity[]> {
    const prismaTeamEntities: PrismaTeamEntity[] = await this.prisma.teamEntity.findMany();
    const teamEntities: TeamEntity[] = [];

    for (const prismaTeamEntity of prismaTeamEntities) {
      const prismaTeamMetadata: PrismaTeamMetadataTeamEntity | null =
        await this.prisma.teamMetadataEntity.findUnique({
          where: {
            UUID: prismaTeamEntity.metadataUUID,
          },
        });
      if (!prismaTeamMetadata) {
        throw new NotFoundException(`Team metadata not found for UUID: ${prismaTeamEntity.UUID}`);
      }

      const prismaTeamContent: PrismaTeamContentTeamEntity | null =
        await this.prisma.teamContentEntity.findUnique({
          include: {
            members: true,
          },
          where: {
            UUID: prismaTeamEntity.contentUUID,
          },
        });
      if (!prismaTeamContent) {
        throw new NotFoundException(`Team content not found for UUID: ${prismaTeamEntity.UUID}`);
      }

      const prismaCommonDate: PrismaCommonDateEntity | null =
        await this.prisma.commonDateEntity.findUnique({
          where: {
            UUID: prismaTeamMetadata?.datesUUID,
          },
        });
      if (!prismaCommonDate) {
        throw new NotFoundException(
          `Common date not found for UUID: ${prismaTeamMetadata?.datesUUID}`,
        );
      }

      let members: IdUuidEntity[] = [];
      const teamContent = prismaTeamContent as any;
      if (teamContent?.members?.length) {
        members = teamContent.members.map((member: PrismaIdUuidEntity) => {
          if (!member) {
            throw new NotFoundException('Invalid member data found');
          }
          return new IdUuidEntity(member.ID, member.EntityUUID);
        });
      } else {
        throw new NotFoundException('Invalid member data found');
      }

      const prismaProductOwner: PrismaIdUuidEntity | null =
        await this.prisma.idUuidEntity.findUnique({
          where: {
            UUID: prismaTeamContent.TceIueProductOwnerUUID,
          },
        });
      if (!prismaProductOwner) {
        throw new NotFoundException(
          `Product owner not found for UUID: ${prismaTeamContent.TceIueProductOwnerUUID}`,
        );
      }
      const productOwner: IdUuidEntity = new IdUuidEntity(
        prismaProductOwner.ID,
        prismaProductOwner.EntityUUID,
      );

      const prismaScrumMaster: PrismaIdUuidEntity | null =
        await this.prisma.idUuidEntity.findUnique({
          where: {
            UUID: prismaTeamContent.TceIueScrumMasterUUID,
          },
        });
      if (!prismaScrumMaster) {
        throw new NotFoundException(
          `Scrum master not found for UUID: ${prismaTeamContent.TceIueScrumMasterUUID}`,
        );
      }
      const scrumMaster: IdUuidEntity = new IdUuidEntity(
        prismaScrumMaster.ID,
        prismaScrumMaster.EntityUUID,
      );

      const teamEntity: TeamEntity = new TeamEntity(
        prismaTeamEntity.ID,
        prismaTeamEntity.UUID,
        new TeamMetadataEntity(
          prismaTeamMetadata.name,
          new CommonDateEntity(
            new Date(prismaCommonDate.createdAt || 0),
            prismaCommonDate.createdBy,
            new Date(prismaCommonDate.updatedAt || 0),
            prismaCommonDate.updatedBy,
            prismaCommonDate.startedAt ? new Date(prismaCommonDate.startedAt) : undefined,
            prismaCommonDate.startedBy ? prismaCommonDate.startedBy : undefined,
            prismaCommonDate.startDate ? new Date(prismaCommonDate.startDate) : undefined,
            prismaCommonDate.endDate ? new Date(prismaCommonDate.endDate) : undefined,
            prismaCommonDate.completedAt ? new Date(prismaCommonDate.completedAt) : undefined,
            prismaCommonDate.completedBy ? prismaCommonDate.completedBy : undefined,
          ),
        ),
        new TeamContentEntity(prismaTeamContent.email, members, productOwner, scrumMaster),
      );

      teamEntities.push(teamEntity);
    }

    return teamEntities;
  }

  async getTeam(UUID: string): Promise<TeamEntity> {
    const prismaTeamEntity: PrismaTeamEntity | null = await this.prisma.teamEntity.findUnique({
      where: {
        UUID: UUID,
      },
    });
    if (!prismaTeamEntity) {
      throw new NotFoundException(`Team not found for UUID: ${UUID}`);
    }

    const prismaTeamMetadata: PrismaTeamMetadataTeamEntity | null =
      await this.prisma.teamMetadataEntity.findUnique({
        where: {
          UUID: prismaTeamEntity.metadataUUID,
        },
      });
    if (!prismaTeamMetadata) {
      throw new NotFoundException(`TeamMetadata not found for team UUID: ${UUID}`);
    }

    const prismaTeamContent: PrismaTeamContentTeamEntity | null =
      await this.prisma.teamContentEntity.findUnique({
        include: {
          members: true,
        },
        where: {
          UUID: prismaTeamEntity.contentUUID,
        },
      });
    if (!prismaTeamContent) {
      throw new NotFoundException(`Team content not found for UUID: ${UUID}`);
    }

    const prismaCommonDate: PrismaCommonDateEntity | null =
      await this.prisma.commonDateEntity.findUnique({
        where: {
          UUID: prismaTeamMetadata.datesUUID,
        },
      });
    if (!prismaCommonDate) {
      throw new NotFoundException(`CommonDate not found for team UUID: ${UUID}`);
    }

    let members: IdUuidEntity[] = [];
    const teamContent = prismaTeamContent as any;
    if (teamContent?.members?.length) {
      members = teamContent.members.map((member: PrismaIdUuidEntity) => {
        if (!member) {
          throw new NotFoundException('Invalid member data found');
        }
        return new IdUuidEntity(member.ID, member.EntityUUID);
      });
    } else {
      throw new NotFoundException('Invalid member data found');
    }

    const prismaProductOwner: PrismaIdUuidEntity | null = await this.prisma.idUuidEntity.findUnique(
      {
        where: {
          UUID: prismaTeamContent.TceIueProductOwnerUUID,
        },
      },
    );
    if (!prismaProductOwner) {
      throw new NotFoundException(
        `Product owner not found for UUID: ${prismaTeamContent.TceIueProductOwnerUUID}`,
      );
    }
    const productOwner: IdUuidEntity = new IdUuidEntity(
      prismaProductOwner.ID,
      prismaProductOwner.EntityUUID,
    );

    const prismaScrumMaster: PrismaIdUuidEntity | null = await this.prisma.idUuidEntity.findUnique({
      where: {
        UUID: prismaTeamContent.TceIueScrumMasterUUID,
      },
    });
    if (!prismaScrumMaster) {
      throw new NotFoundException(
        `Scrum master not found for UUID: ${prismaTeamContent.TceIueScrumMasterUUID}`,
      );
    }
    const scrumMaster: IdUuidEntity | null = new IdUuidEntity(
      prismaScrumMaster.ID,
      prismaScrumMaster.EntityUUID,
    );

    return new TeamEntity(
      prismaTeamEntity.ID,
      prismaTeamEntity.UUID,
      new TeamMetadataEntity(
        prismaTeamMetadata.name,
        new CommonDateEntity(
          new Date(prismaCommonDate.createdAt || 0), // Use a default value or handle null appropriately
          prismaCommonDate.createdBy,
          new Date(prismaCommonDate.updatedAt || 0), // Use a default value or handle null appropriately
          prismaCommonDate.updatedBy,
          prismaCommonDate.startedAt ? new Date(prismaCommonDate.startedAt) : undefined,
          prismaCommonDate.startedBy ? prismaCommonDate.startedBy : undefined,
          prismaCommonDate.startDate ? new Date(prismaCommonDate.startDate) : undefined,
          prismaCommonDate.endDate ? new Date(prismaCommonDate.endDate) : undefined,
          prismaCommonDate.completedAt ? new Date(prismaCommonDate.completedAt) : undefined,
          prismaCommonDate.completedBy ? prismaCommonDate.completedBy : undefined,
        ),
      ),
      new TeamContentEntity(prismaTeamContent.email, members, productOwner, scrumMaster),
    );
  }

  async createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamEntity> {
    try {
      const prismaTeamEntity: PrismaTeamEntity = await this.prisma.teamEntity.create({
        data: {
          ID: createTeamRequestDTO.ID,
          UUID: createTeamRequestDTO.UUID,
          metadata: {
            create: {
              name: createTeamRequestDTO.metadata.name,
              dates: {
                create: {
                  createdAt: createTeamRequestDTO.metadata.dates.createdAt,
                  createdBy: createTeamRequestDTO.metadata.dates.createdBy,
                  updatedAt: createTeamRequestDTO.metadata.dates.updatedAt,
                  updatedBy: createTeamRequestDTO.metadata.dates.updatedBy,
                  startedAt: createTeamRequestDTO.metadata.dates.startedAt,
                  startedBy: createTeamRequestDTO.metadata.dates.startedBy,
                  startDate: createTeamRequestDTO.metadata.dates.startDate,
                  endDate: createTeamRequestDTO.metadata.dates.endDate,
                  completedAt: createTeamRequestDTO.metadata.dates.completedAt,
                  completedBy: createTeamRequestDTO.metadata.dates.completedBy,
                },
              },
            },
          },
          content: {
            create: {
              email: createTeamRequestDTO.content.email,
              members: {
                create: createTeamRequestDTO.content.members.map((member) => ({
                  ID: member.ID,
                  EntityUUID: member.UUID,
                })),
              },
              productOwner: {
                create: {
                  ID: createTeamRequestDTO.content.productOwner.ID,
                  EntityUUID: createTeamRequestDTO.content.productOwner.UUID,
                },
              },
              scrumMaster: {
                create: {
                  ID: createTeamRequestDTO.content.scrumMaster.ID,
                  EntityUUID: createTeamRequestDTO.content.scrumMaster.UUID,
                },
              },
            },
          },
        },
      });
      if (!prismaTeamEntity) {
        throw new Error(`Team ${createTeamRequestDTO.ID} cannot be created`);
      }

      // // update many to many relationship
      // const members: PrismaIdUuidEntity[] = await Promise.all(
      //   createTeamRequestDTO.content.members.map((member) =>
      //     this.prisma.idUuidEntity.create({
      //       data: {
      //         ID: member.ID,
      //         EntityUUID: member.UUID,
      //       },
      //     }),
      //   ),
      // );

      // members.forEach(async (member) => {
      //   await this.prisma.teamContentEntity.update({
      //     where: {
      //       UUID: prismaTeamEntity.contentUUID,
      //     },
      //     data: {
      //       members: {
      //         connect: {
      //           UUID: member.UUID,
      //         },
      //       },
      //     },
      //   });
      // });

      return this.getTeam(prismaTeamEntity.UUID);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Create team failed: ${error.message}`);
    }
  }

  async updateTeam(UUID: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamEntity> {
    try {
      const prismaTeamEntity: PrismaTeamEntity = await this.prisma.teamEntity.update({
        where: { UUID: UUID },
        data: {
          metadata: {
            update: {
              name: updateTeamRequestDTO.metadata.name,
              dates: {
                update: {
                  createdAt: updateTeamRequestDTO.metadata.dates.createdAt,
                  createdBy: updateTeamRequestDTO.metadata.dates.createdBy,
                  updatedAt: updateTeamRequestDTO.metadata.dates.updatedAt,
                  updatedBy: updateTeamRequestDTO.metadata.dates.updatedBy,
                  startedAt: updateTeamRequestDTO.metadata.dates.startedAt,
                  startedBy: updateTeamRequestDTO.metadata.dates.startedBy,
                  startDate: updateTeamRequestDTO.metadata.dates.startDate,
                  endDate: updateTeamRequestDTO.metadata.dates.endDate,
                  completedAt: updateTeamRequestDTO.metadata.dates.completedAt,
                  completedBy: updateTeamRequestDTO.metadata.dates.completedBy,
                },
              },
            },
          },
          content: {
            update: {
              email: updateTeamRequestDTO.content.email,
              members: {
                updateMany: updateTeamRequestDTO.content.members.map((member) => ({
                  where: {
                    UUID: member.UUID,
                  },
                  data: {
                    ID: member.ID,
                    EntityUUID: member.UUID,
                  },
                })),
              },
              productOwner: {
                update: updateTeamRequestDTO.content.productOwner,
              },
              scrumMaster: {
                update: updateTeamRequestDTO.content.scrumMaster,
              },
            },
          },
        },
      });
      if (!prismaTeamEntity) {
        throw new Error(`Team ${UUID} cannot be updated`);
      }

      return this.getTeam(prismaTeamEntity.UUID);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Update team failed: ${error.message}`);
    }
  }

  async deleteTeam(UUID: string): Promise<TeamEntity> {
    try {
      // Get the team entity first to return it later
      const teamEntity: TeamEntity = await this.getTeam(UUID);
      const prismaTeamEntity: PrismaTeamEntity | null = await this.prisma.teamEntity.findUnique({
        where: { UUID },
      });
      if (!prismaTeamEntity) {
        throw new NotFoundException(`Team not found for UUID: ${UUID}`);
      }

      const { metadataUUID, contentUUID }: PrismaTeamEntity = prismaTeamEntity;

      const prismaTeamMetadata: PrismaTeamMetadataTeamEntity | null =
        await this.prisma.teamMetadataEntity.findUnique({
          where: { UUID: metadataUUID },
        });
      if (!prismaTeamMetadata) {
        throw new NotFoundException(`Team metadata not found for UUID: ${metadataUUID}`);
      }

      const prismaTeamContent: PrismaTeamContentTeamEntity | null =
        await this.prisma.teamContentEntity.findUnique({
          include: {
            members: true,
          },
          where: { UUID: contentUUID },
        });
      if (!prismaTeamContent) {
        throw new NotFoundException(`Team content not found for UUID: ${contentUUID}`);
      }

      // Finally, delete the team using Prisma
      await this.prisma.teamEntity.delete({ where: { UUID } });

      // Delete team content and team metadata using Prisma
      await Promise.all([
        this.prisma.teamContentEntity.delete({ where: { UUID: contentUUID } }),
        this.prisma.teamMetadataEntity.delete({ where: { UUID: metadataUUID } }),
      ]);

      // Delete the CommonDateEntity using Prisma
      const { datesUUID } = prismaTeamMetadata;
      const { TceIueProductOwnerUUID, TceIueScrumMasterUUID } = prismaTeamContent;

      const deletedCommonDate: PrismaCommonDateEntity = await this.prisma.commonDateEntity.delete({
        where: { UUID: datesUUID },
      });
      if (!deletedCommonDate) {
        throw new Error(`Common date ${datesUUID} cannot be deleted`);
      }

      let members: IdUuidEntity[] = [];
      const teamContent = prismaTeamContent as any;
      this.logger.debug(JSON.stringify(prismaTeamContent, null, 2));
      if (teamContent?.members?.length) {
        members = await teamContent.members.map(async (member: PrismaIdUuidEntity) => {
          this.logger.debug(`Deleting member ${member}`);
          if (!member) {
            throw new NotFoundException('Invalid member data found');
          }
          const deletedMember: PrismaIdUuidEntity = await this.prisma.idUuidEntity.delete({
            where: { UUID: member.UUID },
          });
          if (!deletedMember) {
            throw new Error(`Member ${member.UUID} cannot be deleted`);
          }
          return new IdUuidEntity(member.ID, member.EntityUUID);
        });
      } else {
        throw new NotFoundException('Invalid member data found: members is empty');
      }
      if (!members) {
        throw new Error(`Members ${contentUUID} cannot be deleted`);
      }

      const deletedProductOwner: PrismaIdUuidEntity = await this.prisma.idUuidEntity.delete({
        where: { UUID: TceIueProductOwnerUUID },
      });
      if (!deletedProductOwner) {
        throw new Error(`Product owner ${TceIueProductOwnerUUID} cannot be deleted`);
      }

      const deletedScrumMaster: PrismaIdUuidEntity = await this.prisma.idUuidEntity.delete({
        where: { UUID: TceIueScrumMasterUUID },
      });
      if (!deletedScrumMaster) {
        throw new Error(`Scrum master ${TceIueScrumMasterUUID} cannot be deleted`);
      }

      // Return the deleted team entity
      return teamEntity;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Delete team failed: ${error.message}`);
    }
  }

  async getTeamByID(ID: string): Promise<TeamEntity> {
    try {
      const teamEntity: PrismaTeamEntity | null = await this.prisma.teamEntity.findUnique({
        where: {
          ID: ID,
        },
      });
      if (!teamEntity) {
        throw new NotFoundException(`Team not found for ID: ${ID}`);
      }

      return this.getTeam(teamEntity.UUID);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Get team by ID failed: ${error.message}`);
    }
  }

  async getTeamByName(name: string): Promise<TeamEntity> {
    try {
      const teamEntity: PrismaTeamEntity | null = await this.prisma.teamEntity.findFirst({
        where: {
          metadata: {
            name: name,
          },
        },
      });
      if (!teamEntity) {
        throw new NotFoundException(`Team not found for name: ${name}`);
      }

      return this.getTeam(teamEntity.UUID);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Get team by name failed: ${error.message}`);
    }
  }

  async getTeamByEmail(email: string): Promise<TeamEntity> {
    try {
      const teamEntity: PrismaTeamEntity | null = await this.prisma.teamEntity.findFirst({
        where: {
          content: {
            email: email,
          },
        },
      });
      if (!teamEntity) {
        throw new NotFoundException(`Team not found for email: ${email}`);
      }

      return this.getTeam(teamEntity.UUID);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Get team by email failed: ${error.message}`);
    }
  }

  async updateTeamMetadata(
    UUID: string,
    updatedMetadata: TeamMetadataDTO,
  ): Promise<TeamMetadataDTO> {
    try {
      const prismaTeamEntity: PrismaTeamEntity | null = await this.prisma.teamEntity.findUnique({
        where: {
          UUID: UUID,
        },
      });
      if (!prismaTeamEntity) {
        throw new NotFoundException(`Team not found for UUID: ${UUID}`);
      }

      const data: Prisma.TeamMetadataEntityUpdateInput = {
        UUID: prismaTeamEntity.metadataUUID,
        name: updatedMetadata.name,
        dates: {
          update: {
            createdAt: updatedMetadata.dates.createdAt,
            createdBy: updatedMetadata.dates.createdBy,
            updatedAt: updatedMetadata.dates.updatedAt,
            updatedBy: updatedMetadata.dates.updatedBy,
            startedAt: updatedMetadata.dates.startedAt,
            startedBy: updatedMetadata.dates.startedBy,
            startDate: updatedMetadata.dates.startDate,
            endDate: updatedMetadata.dates.endDate,
            completedAt: updatedMetadata.dates.completedAt,
            completedBy: updatedMetadata.dates.completedBy,
          },
        },
      };

      // Update the team metadata directly in the database
      const updatedTeamMetadata: PrismaTeamMetadataTeamEntity | null =
        await this.prisma.teamMetadataEntity.update({
          where: { UUID: prismaTeamEntity.metadataUUID },
          data,
        });
      if (!updatedTeamMetadata) {
        throw new NotFoundException(`TeamMetadata not found for UUID: ${UUID}`);
      }

      const prismaCommonDate: PrismaCommonDateEntity | null =
        await this.prisma.commonDateEntity.findUnique({
          where: {
            UUID: updatedTeamMetadata.datesUUID,
          },
        });
      if (!prismaCommonDate) {
        throw new NotFoundException(`CommonDate not found for team UUID: ${UUID}`);
      }

      // Create a CommonDateDTO DTO based on the updated data
      const commonDateDTO: CommonDateDTO = new CommonDateDTO(
        new Date(prismaCommonDate.createdAt || 0),
        prismaCommonDate.createdBy,
        new Date(prismaCommonDate.updatedAt || 0),
        prismaCommonDate.updatedBy,
        prismaCommonDate.startedAt ? new Date(prismaCommonDate.startedAt) : undefined,
        prismaCommonDate.startedBy ? prismaCommonDate.startedBy : undefined,
        prismaCommonDate.startDate ? new Date(prismaCommonDate.startDate) : undefined,
        prismaCommonDate.endDate ? new Date(prismaCommonDate.endDate) : undefined,
        prismaCommonDate.completedAt ? new Date(prismaCommonDate.completedAt) : undefined,
        prismaCommonDate.completedBy ? prismaCommonDate.completedBy : undefined,
      );

      return new TeamMetadataDTO(updatedMetadata.name, commonDateDTO);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Update team metadata failed: ${error.message}`);
    }
  }

  async updateTeamContent(UUID: string, updatedContent: TeamContentDTO): Promise<TeamContentDTO> {
    try {
      const prismaTeamEntity: PrismaTeamEntity | null = await this.prisma.teamEntity.findUnique({
        where: {
          UUID: UUID,
        },
      });
      if (!prismaTeamEntity) {
        throw new NotFoundException(`Team not found for UUID: ${UUID}`);
      }

      const data: Prisma.TeamContentEntityUpdateInput = {
        UUID: prismaTeamEntity.contentUUID,
        email: updatedContent.email,
        members: {
          updateMany: updatedContent.members.map((member) => ({
            where: {
              UUID: member.UUID,
            },
            data: {
              ID: member.ID,
              EntityUUID: member.UUID,
            },
          })),
        },
        productOwner: {
          update: {
            ID: updatedContent.productOwner.ID,
            EntityUUID: updatedContent.productOwner.UUID,
          },
        },
        scrumMaster: {
          update: {
            ID: updatedContent.scrumMaster.ID,
            EntityUUID: updatedContent.scrumMaster.UUID,
          },
        },
      };

      // Update the team content directly in the database
      const updatedTeamContent: PrismaTeamContentTeamEntity | null =
        await this.prisma.teamContentEntity.update({
          where: { UUID: prismaTeamEntity.contentUUID },
          data,
        });
      if (!updatedTeamContent) {
        throw new NotFoundException(`TeamContent not found for UUID: ${UUID}`);
      }

      const prismaProductOwner: PrismaIdUuidEntity | null =
        await this.prisma.idUuidEntity.findUnique({
          where: {
            UUID: updatedTeamContent.TceIueProductOwnerUUID,
          },
        });
      if (!prismaProductOwner) {
        throw new NotFoundException(
          `Product owner not found for UUID: ${updatedTeamContent.TceIueProductOwnerUUID}`,
        );
      }

      const prismaScrumMaster: PrismaIdUuidEntity | null =
        await this.prisma.idUuidEntity.findUnique({
          where: {
            UUID: updatedTeamContent.TceIueScrumMasterUUID,
          },
        });
      if (!prismaScrumMaster) {
        throw new NotFoundException(
          `Scrum master not found for UUID: ${updatedTeamContent.TceIueScrumMasterUUID}`,
        );
      }

      return new TeamContentDTO(
        updatedTeamContent.email,
        updatedContent.members,
        new IdUuidEntity(prismaProductOwner.ID, prismaProductOwner.EntityUUID),
        new IdUuidEntity(prismaScrumMaster.ID, prismaScrumMaster.EntityUUID),
      );
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Update team content failed: ${error.message}`);
    }
  }

  async getTeamMetadata(UUID: string): Promise<TeamMetadataDTO> {
    try {
      // Fetch team metadata and common date data in parallel using Promise.all
      const [prismaTeamMetadata, prismaCommonDate] = await Promise.all([
        this.prisma.teamMetadataEntity.findUnique({
          where: { UUID: UUID },
        }),
        this.prisma.commonDateEntity.findUnique({
          where: { UUID: UUID },
        }),
      ]);

      if (!prismaTeamMetadata) {
        throw new NotFoundException(`TeamMetadata not found for team UUID: ${UUID}`);
      }

      if (!prismaCommonDate) {
        throw new NotFoundException(`CommonDate not found for team UUID: ${UUID}`);
      }

      // Create the TeamMetadataDTO instance using destructuring and object shorthand
      const { name } = prismaTeamMetadata;
      // Create a CommonDateDTO DTO based on the updated data
      const commonDateDTO: CommonDateDTO = new CommonDateDTO(
        new Date(prismaCommonDate.createdAt || 0),
        prismaCommonDate.createdBy,
        new Date(prismaCommonDate.updatedAt || 0),
        prismaCommonDate.updatedBy,
        prismaCommonDate.startedAt ? new Date(prismaCommonDate.startedAt) : undefined,
        prismaCommonDate.startedBy ? prismaCommonDate.startedBy : undefined,
        prismaCommonDate.startDate ? new Date(prismaCommonDate.startDate) : undefined,
        prismaCommonDate.endDate ? new Date(prismaCommonDate.endDate) : undefined,
        prismaCommonDate.completedAt ? new Date(prismaCommonDate.completedAt) : undefined,
        prismaCommonDate.completedBy ? prismaCommonDate.completedBy : undefined,
      );

      return new TeamMetadataDTO(name, commonDateDTO);
    } catch (error: any) {
      throw new Error(`Failed to fetch team metadata: ${error.message}`);
    }
  }

  async getTeamContent(UUID: string): Promise<TeamContentDTO> {
    try {
      const prismaTeamContent: PrismaTeamContentTeamEntity | null =
        await this.prisma.teamContentEntity.findUnique({
          where: { UUID: UUID },
        });
      if (!prismaTeamContent) {
        throw new NotFoundException(`TeamContent not found for team UUID: ${UUID}`);
      }

      const { email } = prismaTeamContent;

      const prismaProductOwner: PrismaIdUuidEntity | null =
        await this.prisma.idUuidEntity.findUnique({
          where: {
            UUID: prismaTeamContent.TceIueProductOwnerUUID,
          },
        });
      if (!prismaProductOwner) {
        throw new NotFoundException(
          `Product owner not found for UUID: ${prismaTeamContent.TceIueProductOwnerUUID}`,
        );
      }

      const prismaScrumMaster: PrismaIdUuidEntity | null =
        await this.prisma.idUuidEntity.findUnique({
          where: {
            UUID: prismaTeamContent.TceIueScrumMasterUUID,
          },
        });
      if (!prismaScrumMaster) {
        throw new NotFoundException(
          `Scrum master not found for UUID: ${prismaTeamContent.TceIueScrumMasterUUID}`,
        );
      }

      return new TeamContentDTO(
        email,
        [],
        new IdUuidEntity(prismaProductOwner.ID, prismaProductOwner.EntityUUID),
        new IdUuidEntity(prismaScrumMaster.ID, prismaScrumMaster.EntityUUID),
      );
    } catch (error: any) {
      throw new Error(`Failed to fetch team content: ${error.message}`);
    }
  }
}

export default PrismaPostgresTeamRepository;
