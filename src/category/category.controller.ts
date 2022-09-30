import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.input';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  store(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.categoryService.remove(+id);
  }

  @Post('/restore/:id')
  restore(@Param('id') id: number) {
    return this.categoryService.restore(+id);
  }

  @Get('/getRemoved')
  getAllRemoved() {
    return this.categoryService.getDeleted();
  }

  @Get('/getRemoved/:id')
  getRemoved(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.getDeleted(+id);
  }
}
