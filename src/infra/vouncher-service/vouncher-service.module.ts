import { Module } from '@nestjs/common';
import { VouncherServiceRepository } from 'src/application/client/vouncher-service.repository';
import { VouncherServiceAdapter } from './vouncher-service.adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    {
      provide: VouncherServiceRepository,
      useClass: VouncherServiceAdapter,
    },
  ],
  exports: [VouncherServiceAdapter],
})
export class VouncherServiceModule {}
