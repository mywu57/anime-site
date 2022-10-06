import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { MovieModule } from './movie/movie.module';
import { TagModule } from './tag/tag.module';
import { OriginModule } from './origin/origin.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot(),
    CategoryModule,
    MovieModule,
    TagModule,
    OriginModule,
  ],
})
export class AppModule {}
