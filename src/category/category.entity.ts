import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Category {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  parentId?: number;

  @Property()
  createAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();

  constructor(name: string) {
    this.name = name;
  }
}
