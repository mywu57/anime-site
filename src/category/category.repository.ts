import { EntityRepository } from '@mikro-orm/postgresql';
import { Category } from './category.entity';

export class CustomCategoryRepository extends EntityRepository<Category> {
  async hello() {
    return 'custom ne';
  }
}
