import { Base } from './../../utils/entities/base.entity';
import { Movie } from './../../movie/entities/movie.entity';
import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
import { CustomCategoryRepository } from '../category.repository';

@Entity({ customRepository: () => CustomCategoryRepository })
export class Category extends Base<Category> {
  @Property()
  name: string;

  @Property({ nullable: true })
  parentId?: number;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies = new Collection<Movie>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
