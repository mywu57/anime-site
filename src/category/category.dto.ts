import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;

  @Field()
  createAt: Date;

  @Field()
  updateAt: Date;
}
