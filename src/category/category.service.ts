import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
  ) {}

  async fetchAll(): Promise<Category> {
    const category = new Category('shounen');
    console.log(category);

    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  async create(name, parentId): Promise<Category> {
    const category = this.categoryRepository.create({
      name,
      parentId,
    });
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }
}
