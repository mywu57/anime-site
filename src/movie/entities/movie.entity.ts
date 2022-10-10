import { Base } from './../../utils/entities/base.entity';
import { CustomMovieRepository } from './../movie.repository';
import { Tag } from './../../tag/entities/tag.entity';
import { Category } from './../../category/entities/category.entity';
import {
  Entity,
  ManyToOne,
  Property,
  ManyToMany,
  Collection,
  Embedded,
} from '@mikro-orm/core';
import WithSoftDelete from '../../utils/decorator/soft-delete.decorator';
import { Origin } from './../../origin/entities/origin.entity';
import { Image } from './../../image/entities/image.entity';

@WithSoftDelete()
@Entity({ customRepository: () => CustomMovieRepository })
export class Movie extends Base<Movie> {
  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToOne('Category')
  category!: Category;

  @ManyToMany(() => Tag, 'movies', { owner: true })
  tags = new Collection<Tag>(this);

  @ManyToOne('Origin')
  origin!: Origin;

  @Property()
  airingStatus: number;

  @Property()
  episodeCount: number;

  @Embedded(() => Image, { array: true })
  images: Image[] = [];

  constructor(
    name: string,
    category: Category,
    origin: Origin,
    airingStatus: number,
    episodeCount: number,
  ) {
    super();
    this.name = name;
    this.category = category;
    this.origin = origin;
    this.airingStatus = airingStatus;
    this.episodeCount = episodeCount;
  }
}
