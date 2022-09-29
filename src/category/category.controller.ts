import { CreateCategoryDto } from './dto/create-category.input';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async index(): Promise<Category[]> {
    return this.categoryService.fetchAll();
  }

  @Get('/getDeleted')
  async getAllDeleted() {
    return this.categoryService.getDeleted();
  }

  @Get('/getDeleted/:id')
  async getDeleted(@Param('id') id: number) {
    return this.categoryService.getDeleted(id);
  }

  @Post()
  async store(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('/restore/:id')
  async restore(@Param('id') id: number) {
    return this.categoryService.restore(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoryService.delete(id)
  }
}
