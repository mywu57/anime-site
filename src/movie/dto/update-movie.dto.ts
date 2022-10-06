import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { Origin } from './../../origin/entities/origin.entity';
import { Tag } from './../../tag/entities/tag.entity';
import { Collection } from '@mikro-orm/core';
import { Category } from './../../category/entities/category.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  category?: Category;

  @ApiProperty()
  @IsOptional()
  tags?: Collection<Tag>;

  @ApiProperty()
  @IsOptional()
  origin?: Origin;

  @ApiProperty()
  @IsOptional()
  airingStatus?: number;

  @ApiProperty()
  @IsOptional()
  episodeCount?: number;
}
