import { removeEmpty } from './../utils/helpers/validate.helper';
import { QueryOrder } from '@mikro-orm/core';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './movie.repository';
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Image } from './../image/entities/image.entity';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async create(createMovieDto: CreateMovieDto, files: Array<Express.Multer.File>) {
    createMovieDto = removeEmpty(createMovieDto)
    const images = [];
    files.forEach(file => {
      images.push(new Image(file.filename, file.path))
    });
    createMovieDto.images = images;
    const movie = this.movieRepository.create(createMovieDto);
    await this.movieRepository.persistAndFlush(movie);
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

  async update(id: number, updateMovieDto: UpdateMovieDto, files: Array<Express.Multer.File>) {
    updateMovieDto = removeEmpty(updateMovieDto);
    const movie = await this.findOne(id);
    const images = [];
    files.forEach(file => {
      images.push(new Image(file.filename, file.path))
    });
    updateMovieDto.images = images;
    this.movieRepository.assign(movie, updateMovieDto);
    await this.movieRepository.persistAndFlush(movie);
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
