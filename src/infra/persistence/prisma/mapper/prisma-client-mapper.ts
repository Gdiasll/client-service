import { Prisma, Client as PrismaClient } from '@prisma/client';
import { Client } from 'src/domain/client';

export class PrismaClientMapper {
  static toDomain(entity: PrismaClient): Client {
    const model = new Client({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      vouncher: entity.vouncher,
    });
    return model;
  }

  static toPrisma(client: Client): Prisma.ClientUncheckedCreateInput {
    return {
      name: client.name,
      email: client.email,
    };
  }
}
