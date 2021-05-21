// import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // query params are sent through the network as strings
  // with @Type, the value coming in is parsed as a number
  // @Type(() => Number)

  @IsPositive()
  @IsOptional()
  limit: number;

  @IsPositive()
  @IsOptional()
  offset: number;
}
