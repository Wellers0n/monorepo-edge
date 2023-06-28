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
}

export class FindPayableDataDTO {
  emissionDate: Date;
  assignorId: number;
}
