import { Test, TestingModule } from '@nestjs/testing';
import { ClientRepository } from '../client.repository';
import { GetClientUseCase } from './get-client';

describe('GetClientUseCase', () => {
  let getClientUseCase: GetClientUseCase;
  let clientRepository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetClientUseCase,
        {
          provide: ClientRepository,
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    getClientUseCase = module.get<GetClientUseCase>(GetClientUseCase);
    clientRepository = module.get<ClientRepository>(ClientRepository);
  });

  it('should call getAll method of ClientRepository', async () => {
    await getClientUseCase.execute();
    expect(clientRepository.getAll).toHaveBeenCalled();
  });

  it('should return the expected result', async () => {
    const client = { name: 'Client 1', email: 'mail@mail.com', id: 1, vouncher: '123' };
    const clients: any[] = [client];
    jest.spyOn(clientRepository, 'getAll').mockResolvedValue(clients);

    const result = await getClientUseCase.execute();
    expect(result).toEqual(clients);
  });
});
