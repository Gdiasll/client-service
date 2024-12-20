import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../client.repository';
import { Client } from 'src/domain/client';

interface DeleteClientUseCaseCommand {
  id: number;
}

@Injectable()
export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({ id }: DeleteClientUseCaseCommand): Promise<Client> {
    const client = await this.clientRepository.getById(id);
    if (!client) throw new NotFoundException('Client not found');
    await this.clientRepository.delete(id);
    return client;
  }
}
