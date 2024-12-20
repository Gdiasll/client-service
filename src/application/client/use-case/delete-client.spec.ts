import { Test, TestingModule } from '@nestjs/testing';
import { DeleteClientUseCase } from './delete-client';
import { ClientRepository } from '../client.repository';
import { Client } from '../../../domain/client';
import { NotFoundException } from '@nestjs/common';

describe('DeleteClientUseCase', () => {
  let deleteClientUseCase: DeleteClientUseCase;
  let clientRepository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClientUseCase,
        {
          provide: ClientRepository,
          useValue: {
            getById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteClientUseCase = module.get<DeleteClientUseCase>(DeleteClientUseCase);
    clientRepository = module.get<ClientRepository>(ClientRepository);
  });

  it('should call getById and delete methods of ClientRepository', async () => {
    const client = new Client({ id: 1, name: 'Client 1', email: 'mail@mail.com' });
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(client);

    await deleteClientUseCase.execute({ id: 1 });
    expect(clientRepository.getById).toHaveBeenCalledWith(1);
    expect(clientRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if client does not exist', async () => {
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(null);

    await expect(deleteClientUseCase.execute({ id: 1 })).rejects.toThrow(NotFoundException);
  });

  it('should return the deleted client', async () => {
    const client = new Client({ id: 1, name: 'Client 1', email: 'mail@mail.com' });
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(client);

    const result = await deleteClientUseCase.execute({ id: 1 });
    expect(result).toEqual(client);
  });
});
