import { Origin } from './../../origin/entities/origin.entity';
import { Tag } from './../../tag/entities/tag.entity';
import { Collection } from '@mikro-orm/core';
import { Category } from './../../category/entities/category.entity';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  category?: Category;

  @ApiProperty()
  @IsOptional()
  tags?: Collection<Tag>;

  @ApiProperty({
    description: 'Array with tag id',
    default: null
  })
  @IsNotEmpty()
  origin: Origin;

  @ApiProperty()
  @IsOptional()
  airingStatus?: number;

  @ApiProperty()
  @IsOptional()
  episodeCount?: number;
}
