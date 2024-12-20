import { Test, TestingModule } from '@nestjs/testing';
import { UpdateClientUseCase } from './update-client';
import { ClientRepository } from '../client.repository';
import { Client } from '../../../domain/client';
import { NotFoundException } from '@nestjs/common';

describe('UpdateClientUseCase', () => {
  let updateClientUseCase: UpdateClientUseCase;
  let clientRepository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClientUseCase,
        {
          provide: ClientRepository,
          useValue: {
            getById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    updateClientUseCase = module.get<UpdateClientUseCase>(UpdateClientUseCase);
    clientRepository = module.get<ClientRepository>(ClientRepository);
  });

  it('should call getById and update methods of ClientRepository', async () => {
    const client = new Client({ id: 1, name: 'Client 1', email: 'mail@mail.com' });
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(client);
    const updatedClientData = { id: 1, name: 'Updated Client', email: 'updated@mail.com' };

    await updateClientUseCase.execute(updatedClientData);
    expect(clientRepository.getById).toHaveBeenCalledWith(1);
    expect(clientRepository.update).toHaveBeenCalledWith(expect.any(Client));
  });

  it('should throw NotFoundException if client does not exist', async () => {
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(null);
    const updatedClientData = { id: 1, name: 'Updated Client', email: 'updated@mail.com' };

    await expect(updateClientUseCase.execute(updatedClientData)).rejects.toThrow(NotFoundException);
  });

  it('should return the updated client', async () => {
    const client = new Client({ id: 1, name: 'Client 1', email: 'mail@mail.com' });
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(client);
    const updatedClient = new Client({ id: 1, name: 'Updated Client', email: 'updated@mail.com' });
    jest.spyOn(clientRepository, 'update').mockResolvedValue(updatedClient);

    const result = await updateClientUseCase.execute(updatedClient);
    expect(result).toEqual(updatedClient);
  });
});
