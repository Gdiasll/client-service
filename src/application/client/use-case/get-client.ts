import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../client.repository';
import { Client } from 'src/domain/client';

@Injectable()
export class GetClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    const response = this.clientRepository.getAll();
    return response;
  }
}
