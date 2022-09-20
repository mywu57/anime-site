import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [MikroOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
