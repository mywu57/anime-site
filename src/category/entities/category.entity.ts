import { Entity, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { CustomCategoryRepository } from '../category.repository';
import WithSoftDelete from '../../../utils/decorator/soft-delete.decorator';

@WithSoftDelete()
@ObjectType()
@Entity({ customRepository: () => CustomCategoryRepository })
export class Category {
  @Field(() => ID)
  @PrimaryKey()
  public id: number;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property({ nullable: true })
  parentId?: number;

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

  constructor(name: string, parenId: number) {
    this.name = name;
    this.parentId = parenId;
  }
}
