import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryType } from './category.type';

@Resolver()
export class CategoryResolver {
  constructor(private categorySerivce: CategoryService) {}

  @Query(() => String)
  getStuff() {
    return 'This is working';
  }

  @Mutation(() => CategoryType)
  createCategory(
    @Args('name') name: string,
    @Args('parentId') parentId: number,
  ) {
    return this.categorySerivce.create(name, parentId);
  }
}
