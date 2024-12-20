import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../client.repository';
import { Client } from 'src/domain/client';

interface CreateClientUseCaseCommand {
  name: string;
  email: string;
}

@Injectable()
export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({ name, email }: CreateClientUseCaseCommand): Promise<Client> {
    const client = new Client({
      name,
      email,
    });
    const response = await this.clientRepository.create(client);
    return response;
  }
}
