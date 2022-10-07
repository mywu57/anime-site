import { EntityRepository } from '@mikro-orm/postgresql';
import { Category } from './entities/category.entity';

export class CategoryRepository extends EntityRepository<Category> {
  async getById(id: number) {
    const item = await this.findOne(id);
    if (item) {
      return item;
    }
  }

  async softDelete(id: number) {
    const existItem = await this.getById(id);
    existItem.deletedAt = new Date();
    await this.persistAndFlush(existItem);
  }

  async getDeleted(id?: number): Promise<any> {
    if (!!id) {
      return await this.findOne(
        { id },
        {
          filters: {
            softDelete: {
              getOnlyDeleted: true,
            },
          },
        },
      );
    }
    return await this.findAll({
      filters: {
        softDelete: {
          getOnlyDeleted: true,
        },
      },
    });
  }

  async restore(id: number) {
    const existItem = await this.getDeleted(id);
    existItem.deletedAt = null;
    await this.persistAndFlush(existItem);
    return existItem;
  }
}
