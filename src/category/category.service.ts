import { CreateCategoryDto } from './dto/create-category.input';
import { QueryOrder, Entity } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CustomCategoryRepository } from './category.repository';
import { removeEmpty } from 'src/utils/helpers/validate.helper';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CustomCategoryRepository) {}

  async fetchAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll({
      orderBy: { id: QueryOrder.ASC },
    });
    return categories;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    createCategoryDto = removeEmpty(createCategoryDto); 
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  async category(id: number) {
    return await this.categoryRepository.findOne({id: id});
  }

  async delete(id: number) {
    return await this.categoryRepository.softDelete(id);
  }

  async getDeleted(id?: number) {
    return await this.categoryRepository.getDeleted(id);
  }

  async restore(id: number) {
    return await this.categoryRepository.restore(id);
  }
}
