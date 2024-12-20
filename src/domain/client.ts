import { Entity } from '../core/entity';

export interface ClientProps {
  name: string;
  email: string;
  id?: number;
  vouncher?: string;
}

export class Client extends Entity<ClientProps> {
  constructor(props: ClientProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  set id(value: number) {
    this.props.id = value;
  }
}
