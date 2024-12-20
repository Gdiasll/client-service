import { Module } from '@nestjs/common';
import { ClientController } from 'src/infra/http/client.controller';
import { PersistenceModule } from 'src/infra/persistence/persistence.module';
import { CreateClientUseCase } from '../client/use-case/create-client';
import { GetClientUseCase } from '../client/use-case/get-client';
import { DeleteClientUseCase } from '../client/use-case/delete-client';
import { UpdateClientUseCase } from '../client/use-case/update-client';
import { BindVouncherUseCase } from './use-case/bind-vouncher';
import { VouncherServiceModule } from 'src/infra/vouncher-service/vouncher-service.module';

@Module({
  imports: [PersistenceModule, VouncherServiceModule],
  controllers: [ClientController],
  providers: [
    CreateClientUseCase,
    GetClientUseCase,
    DeleteClientUseCase,
    UpdateClientUseCase,
    BindVouncherUseCase,
  ],
})
export class ClientModule {}
