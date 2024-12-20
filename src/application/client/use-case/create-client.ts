import { Injectable, ConflictException } from '@nestjs/common';
import { ClientRepository } from '../client.repository';
import { Client } from '../../../domain/client';

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
    try {
      const response = await this.clientRepository.create(client);
      return response;
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target.includes('email')) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
}
