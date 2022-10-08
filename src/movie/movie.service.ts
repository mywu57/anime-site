import { Image } from './../image/entities/image.entity';
import { EntityManager, AbstractSqlDriver } from '@mikro-orm/postgresql';
import { removeEmpty } from './../utils/helpers/validate.helper';
import { QueryOrder } from '@mikro-orm/core';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './movie.repository';
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository,
    private em: EntityManager<AbstractSqlDriver>) {}

  async create(createMovieDto: CreateMovieDto) {
    createMovieDto = removeEmpty(createMovieDto);
    const { image } = createMovieDto;
    const movie = this.movieRepository.create(createMovieDto);
    await this.movieRepository.persistAndFlush(movie);
    console.log(movie.id);
    if (!!image) {
      const saveImage = new Image(image, movie);
      await this.em.persistAndFlush(saveImage);
    }
    return movie;
  }

  async findAll(): Promise<Movie[]> {
    const movies = this.movieRepository.findAll({
      orderBy: { id: QueryOrder.ASC },
    });
    return movies;
  }

  async findOne(id: number) {
    return await this.movieRepository.findOne(id, {
      populate: ['category', 'origin', 'tags'],
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    updateMovieDto = removeEmpty(updateMovieDto);
    const movie = await this.findOne(id);
    this.movieRepository.assign(movie, updateMovieDto);
    await this.movieRepository.persistAndFlush(movie);
    await this.movieRepository.populate(movie, ['tags']);
    return movie;
  }

  async remove(id: number) {
    return await this.movieRepository.softDelete(id);
  }

  async category(id: number) {
    return await this.movieRepository.findOne({ id: id });
  }

  async getDeleted(id?: number) {
    return await this.movieRepository.getDeleted(id);
  }

  async restore(id: number) {
    return await this.movieRepository.restore(id);
  }
}
