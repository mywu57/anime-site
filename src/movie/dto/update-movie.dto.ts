import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { Origin } from './../../origin/entities/origin.entity';
import { Tag } from './../../tag/entities/tag.entity';
import { Collection } from '@mikro-orm/core';
import { Category } from './../../category/entities/category.entity';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  category?: Category;

  @IsOptional()
  tags?: Collection<Tag>;

  @IsOptional()
  origin?: Origin;

  @IsOptional()
  airingStatus?: number;

  @IsOptional()
  episodeCount?: number;
}
