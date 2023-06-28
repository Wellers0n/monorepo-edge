import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindPayableQueryDTO {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  emissionDate: Date;
}

export class FindPayableDataDTO {
  emissionDate: Date;
  userId: number;
}
