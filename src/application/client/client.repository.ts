import { Client } from 'src/domain/client';

export abstract class ClientRepository {
  abstract create(data: Client): Promise<Client>;
  abstract getAll(): Promise<Client[]>;
  abstract update(data: Client): Promise<Client>;
  abstract delete(id: number): Promise<void>;
  abstract getById(id: number): Promise<Client | null>;
  abstract bindVouncher(id: number, vouncherId: string): Promise<Client>;
}
