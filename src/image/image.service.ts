import { Movie } from './../movie/entities/movie.entity';
import { Image } from './entities/image.entity';
import { Origin } from './../origin/entities/origin.entity';
import { AbstractSqlDriver, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  constructor(private em: EntityManager<AbstractSqlDriver>) {}
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  async findAll() {
    const origin = await this.em.findOne(Movie, {id: 3});
    console.log('origin', origin.constructor.name);
    console.log('instan', origin instanceof Origin);
    
    const image = new Image('hello.jpg', origin);
    console.log('image', image);

    this.em.persistAndFlush(image);
    return image;
    
    
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
