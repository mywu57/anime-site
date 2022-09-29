import { BaseEntity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import WithSoftDelete from '../decorator/soft-delete.decorator';

// @WithSoftDelete()
// @ObjectType({ isAbstract: true})
export class Base<T extends { id: number }> extends BaseEntity<T, 'id'> {
  @Field(() => ID)
  @PrimaryKey()
  public id: number;

  @Field()
  @Property()
  public createAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  public updateAt: Date = new Date();

  @Index()
  @Field()
  @Property({ nullable: true, type: 'timestamptz' })
  deletedAt?: Date;

  constructor(body = {}) {
    super();
    this.assign(body);
  }
}
