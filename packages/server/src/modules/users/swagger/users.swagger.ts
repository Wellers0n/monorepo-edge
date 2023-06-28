import { ApiProperty } from '@nestjs/swagger';

export class UserOkResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class UserUnauthorizedResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;
}
