import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VouncherServiceRepository } from 'src/application/client/vouncher-service.repository';
import { Vouncher } from 'src/domain/vouncher';

@Injectable()
export class VouncherServiceAdapter implements VouncherServiceRepository {
  constructor(private readonly httpService: HttpService) {}

  async useVouncher(vouncherId: string): Promise<Vouncher> {
    const url = `http://localhost:3000/vouncher/${vouncherId}`; //TODO: pass by .env
    const { data } = await firstValueFrom(
      this.httpService.patch<Vouncher>(url).pipe(
        catchError((error: AxiosError) => {
          throw new BadRequestException(
            `Failed to fetch client info from external API. code: ${error.code}`,
          );
        }),
      ),
    );
    return this.mapToClientInfo(data);
  }

  private mapToClientInfo(data: any): Vouncher {
    return new Vouncher({
      id: data.id,
      status: data.status,
      createdAt: data.createdAt,
      expiresIn: data.expiresIn,
    });
  }
}
