import { Base } from './../../utils/entities/base.entity';
import { Movie } from './../../movie/entities/movie.entity';
import { Entity, ManyToMany, Property, Collection } from '@mikro-orm/core';
import WithSoftDelete from '../../utils/decorator/soft-delete.decorator';

@WithSoftDelete()
@Entity()
export class Tag extends Base<Tag> {
  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToMany(() => Movie, (movie) => movie.tags)
  movies = new Collection<Movie>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
