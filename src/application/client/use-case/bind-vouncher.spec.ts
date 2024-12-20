import { Test, TestingModule } from '@nestjs/testing';
import { BindVouncherUseCase } from './bind-vouncher';
import { ClientRepository } from '../client.repository';
import { VouncherServiceRepository } from '../vouncher-service.repository';
import { Client } from '../../../domain/client';
import { NotFoundException } from '@nestjs/common';

describe('BindVouncherUseCase', () => {
  let bindVouncherUseCase: BindVouncherUseCase;
  let clientRepository: ClientRepository;
  let vouncherService: VouncherServiceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BindVouncherUseCase,
        {
          provide: ClientRepository,
          useValue: {
            getById: jest.fn(),
            bindVouncher: jest.fn(),
          },
        },
        {
          provide: VouncherServiceRepository,
          useValue: {
            useVouncher: jest.fn(),
          },
        },
      ],
    }).compile();

    bindVouncherUseCase = module.get<BindVouncherUseCase>(BindVouncherUseCase);
    clientRepository = module.get<ClientRepository>(ClientRepository);
    vouncherService = module.get<VouncherServiceRepository>(VouncherServiceRepository);
  });

  it('should call getById, useVouncher, and bindVouncher methods', async () => {
    const client = new Client({ id: 1, name: 'Client 1', email: 'mail@mail.com' });
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(client);
    const vouncherId = 'vouncher123';

    await bindVouncherUseCase.execute({ id: 1, vouncherId });
    expect(clientRepository.getById).toHaveBeenCalledWith(1);
    expect(vouncherService.useVouncher).toHaveBeenCalledWith(vouncherId);
    expect(clientRepository.bindVouncher).toHaveBeenCalledWith(1, vouncherId);
  });

  it('should throw NotFoundException if client does not exist', async () => {
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(null);
    const vouncherId = 'vouncher123';

    await expect(bindVouncherUseCase.execute({ id: 1, vouncherId })).rejects.toThrow(NotFoundException);
  });

  it('should return the client with the vouncher bound', async () => {
    const client = new Client({ id: 1, name: 'Client 1', email: 'mail@mail.com' });
    jest.spyOn(clientRepository, 'getById').mockResolvedValue(client);
    const clientBinded = new Client({ id: 1, name: 'Client 1', email: 'mail@mail.com', vouncher: 'vouncher123' });
    jest.spyOn(clientRepository, 'bindVouncher').mockResolvedValue(clientBinded);
    const vouncherId = 'vouncher123';

    const result = await bindVouncherUseCase.execute({ id: 1, vouncherId });
    expect(result).toEqual(clientBinded);
  });
});
