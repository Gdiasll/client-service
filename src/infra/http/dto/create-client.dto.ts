import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const CreateClientSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address').min(5, 'Email must be at least 5 characters long'),
});

export class CreateClientDto {
  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the client',
    example: 'john.doe@example.com',
  })
  email: string;

  static validate(data: CreateClientDto) {
    const result = CreateClientSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.errors.map(e => e.message).join(', '));
    }
    return result.data;
  }
}
