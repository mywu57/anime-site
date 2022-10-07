import { Base } from './../../utils/entities/base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class Origin extends Base<Origin> {
  @Property()
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
