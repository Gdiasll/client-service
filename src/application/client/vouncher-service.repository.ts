import { Vouncher } from '../../domain/vouncher';

export abstract class VouncherServiceRepository {
  abstract useVouncher(vouncherId: string): Promise<Vouncher>;
}
