import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindPayableQueryDTO {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  emissionDate: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  assignorId: number;

  @IsOptional()
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  offset: number;
}

export class FindPayableDataDTO {
  emissionDate: Date;
  assignorId: number;
  limit: number;
  offset: number;
}
