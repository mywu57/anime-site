import { QueryOrder, Entity } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CustomCategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CustomCategoryRepository) {}

  async fetchAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll({
      orderBy: { id: QueryOrder.ASC },
    });
    return categories;
  }

  async create(name, parentId): Promise<Category> {
    const category = this.categoryRepository.create({
      name,
      parentId,
    });
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  async category(id: number) {
    return await this.categoryRepository.findOne({id: id});
  }
}
