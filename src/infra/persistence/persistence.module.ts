import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientRepository } from 'src/application/client/client.repository';
import { PrismaClientRepository } from './prisma/repositories/prisma-client.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
  exports: [PrismaService, ClientRepository],
})
export class PersistenceModule {}
