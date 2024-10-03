import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'Number of items per page',
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'Number of items to skip',
  })
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number;
}
