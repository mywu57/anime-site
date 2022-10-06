import { Origin } from './../../origin/entities/origin.entity';
import { Tag } from './../../tag/entities/tag.entity';
import { Collection } from '@mikro-orm/core';
import { Category } from './../../category/entities/category.entity';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  category?: Category;

  @IsOptional()
  tags?: Collection<Tag>;

  @IsNotEmpty()
  origin: Origin;

  @IsOptional()
  airingStatus?: number;

  @IsOptional()
  episodeCount?: number;
}
