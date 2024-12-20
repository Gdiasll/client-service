import { Entity } from 'src/core/entity';

export interface VouncherProps {
  id: string;
  createdAt: string;
  expiresIn: string;
  status: string;
}

export class Vouncher extends Entity<VouncherProps> {
  constructor(props: VouncherProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get status(): string {
    return this.props.status;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get expiresIn(): string {
    return this.props.expiresIn;
  }
}
