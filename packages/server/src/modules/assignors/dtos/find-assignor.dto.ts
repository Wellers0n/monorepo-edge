import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindAssignorQueryDTO {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  document: string;
}

export class FindAssignorDataDTO {
  email: string;
  name: string;
  phone: string;
  document: string;
}
