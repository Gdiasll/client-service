import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateClientDto, CreateClientSchema } from './dto/create-client.dto';
import { CreateClientUseCase } from 'src/application/client/use-case/create-client';
import { GetClientUseCase } from 'src/application/client/use-case/get-client';
import { DeleteClientUseCase } from 'src/application/client/use-case/delete-client';
import { UpdateClientDto, UpdateClientSchema } from './dto/update-client.dto';
import { ZodValidationPipe } from './pipe/zod-validation.pipe';
import { UpdateClientUseCase } from 'src/application/client/use-case/update-client';
import { BindVouncherUseCase } from 'src/application/client/use-case/bind-vouncher';

@Controller('/client')
export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private getClientUseCase: GetClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private bindVouncherUseCase: BindVouncherUseCase,
  ) {}

  @Post('')
  create(
    @Body(new ZodValidationPipe(CreateClientSchema)) dto: CreateClientDto,
  ) {
    return this.createClientUseCase.execute(dto);
  }

  @Get('')
  getAll() {
    return this.getClientUseCase.execute();
  }

  @Put(':id')
  update(
    @Param('id', { transform: (id) => Number(id) }) id: number,
    @Body(new ZodValidationPipe(UpdateClientSchema))
    dto: UpdateClientDto,
  ) {
    return this.updateClientUseCase.execute({ id, ...dto });
  }

  @Delete(':id')
  delete(@Param('id', { transform: (id) => Number(id) }) id: number) {
    return this.deleteClientUseCase.execute({ id });
  }

  @Put(':id/vouncher/:vouncherId')
  bindVouncher(
    @Param('id', { transform: (id) => Number(id) }) id: number,
    @Param('vouncherId') vouncherId: string,
  ) {
    return this.bindVouncherUseCase.execute({ id, vouncherId });
  }
}
