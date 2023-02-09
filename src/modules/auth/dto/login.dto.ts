import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john@mail.com' })
  email: string;

  @ApiProperty({ example: 'john@123' })
  password: string;
}
