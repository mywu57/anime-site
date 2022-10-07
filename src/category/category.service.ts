import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.input';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { removeEmpty } from 'src/utils/helpers/validate.helper';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.persistAndFlush(category);
    createCategoryDto = removeEmpty(createCategoryDto);
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll({
      orderBy: { id: QueryOrder.ASC },
    });
    return categories;
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne(
      { id: id },
      { populate: ['movies'] },
    );
  }

  async update(id: number, updateCategory: UpdateCategoryDto) {
    return `This action updates a #${id} tag`;
  }

  async remove(id: number) {
    return await this.categoryRepository.softDelete(id);
  }

  async getDeleted(id?: number) {
    return await this.categoryRepository.getDeleted(id);
  }

  async restore(id: number) {
    return await this.categoryRepository.restore(id);
  }
}
