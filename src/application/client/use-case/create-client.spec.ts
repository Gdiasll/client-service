import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUseCase } from './create-client';
import { ClientRepository } from '../client.repository';
import { Client } from '../../../domain/client';

describe('CreateClientUseCase', () => {
  let createClientUseCase: CreateClientUseCase;
  let clientRepository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUseCase,
        {
          provide: ClientRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createClientUseCase = module.get<CreateClientUseCase>(CreateClientUseCase);
    clientRepository = module.get<ClientRepository>(ClientRepository);
  });

  it('should call create method of ClientRepository', async () => {
    const clientData = { name: 'Client 1', email: 'mail@mail.com' };
    await createClientUseCase.execute(clientData);
    expect(clientRepository.create).toHaveBeenCalledWith(expect.any(Client));
  });

  it('should return the created client', async () => {
    const clientData = { name: 'Client 1', email: 'mail@mail.com' };
    const createdClient = new Client({ ...clientData, id: 1 });
    jest.spyOn(clientRepository, 'create').mockResolvedValue(createdClient);

    const result = await createClientUseCase.execute(clientData);
    expect(result).toEqual(createdClient);
  });
});
