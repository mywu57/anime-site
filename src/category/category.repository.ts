import { EntityRepository } from '@mikro-orm/postgresql';
import { Category } from './entities/category.entity';

export class CustomCategoryRepository extends EntityRepository<Category> {
  async getById(id: number): Promise<Category> {
    const category = await this.findOne(id);
    if (category) {
      return category;
    }
  }

  async softDelete(id: number) {
    const existItem = await this.getById(id);
    existItem.deletedAt = new Date();
    await this.persistAndFlush(existItem);
  }
}
