import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/application/client/client.repository';
import { PrismaService } from '../prisma.service';
import { Client } from 'src/domain/client';
import { PrismaClientMapper } from '../mapper/prisma-client-mapper';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(client: Client): Promise<Client> {
    const data = PrismaClientMapper.toPrisma(client);
    const entity = await this.prisma.client.create({ data });
    return PrismaClientMapper.toDomain(entity);
  }

  async getAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany();
    return clients.map((item) => PrismaClientMapper.toDomain(item));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.client.delete({ where: { id } });
  }

  async getById(id: number): Promise<Client | null> {
    const data = await this.prisma.client.findUnique({ where: { id } });
    if (!data) return null;
    return PrismaClientMapper.toDomain(data);
  }

  async update(client: Client): Promise<Client> {
    const data = PrismaClientMapper.toPrisma(client);
    const entity = await this.prisma.client.update({
      where: { id: client.id },
      data,
    });
    const updatedClient = PrismaClientMapper.toDomain(entity);
    return updatedClient;
  }

  async bindVouncher(id: number, vouncherId: string): Promise<Client> {
    const entity = await this.prisma.client.update({
      where: { id },
      data: { vouncher: vouncherId },
    });
    const updatedClient = PrismaClientMapper.toDomain(entity);
    return updatedClient;
  }
}
