import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../client.repository';
import { VouncherServiceRepository } from '../vouncher-service.repository';

interface BindVouncherUseCaseCommand {
  id: number;
  vouncherId: string;
}

@Injectable()
export class BindVouncherUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private vouncherService: VouncherServiceRepository,
  ) {}

  async execute({ id, vouncherId }: BindVouncherUseCaseCommand) {
    const client = this.clientRepository.getById(id);
    if (!client) throw new NotFoundException('Client not found');
    //TODO: validate if given vouncherId exists
    await this.vouncherService.useVouncher(vouncherId);
    return this.clientRepository.bindVouncher(id, vouncherId);
  }
}
