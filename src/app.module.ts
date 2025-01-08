import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { MovieModule } from './movie/movie.module';
import { TagModule } from './tag/tag.module';
import { OriginModule } from './origin/origin.module';
import { ImageModule } from './image/image.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    // MulterModule.register({
    //   dest: './files',
    // }),
    ConfigModule.forRoot(),
    CategoryModule,
    MovieModule,
    TagModule,
    OriginModule,
    ImageModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
