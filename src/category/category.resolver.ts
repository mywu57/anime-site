import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private categorySerivce: CategoryService) {}

  @Query(() => [CategoryDto])
  async category(): Promise<CategoryDto[]> {
    return await this.categorySerivce.fetchAll();
  }

  @Mutation(() => CategoryDto)
  createCategory(
    @Args('name') name: string,
    @Args('parentId') parentId: number,
  ) {
    // return this.categorySerivce.create(name, parentId);
  }
}
