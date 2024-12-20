import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../client.repository';
import { Client } from '../../../domain/client';

interface UpdateClientUseCaseCommand {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UpdateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    id,
    name,
    email,
  }: UpdateClientUseCaseCommand): Promise<Client> {
    const client = await this.clientRepository.getById(id);
    if (!client) throw new NotFoundException('Client not found');
    const payload = new Client({ name, email, id });
    const updatedClient = await this.clientRepository.update(payload);
    return updatedClient;
  }
}
