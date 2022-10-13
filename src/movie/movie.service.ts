import { ImageService } from './../image/image.service';
import { removeEmpty } from './../utils/helpers/validate.helper';
import { QueryOrder } from '@mikro-orm/core';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './movie.repository';
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private imageService: ImageService,
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    files: Array<Express.Multer.File>,
  ) {
    createMovieDto = removeEmpty(createMovieDto);
    const images = [];
    for await (const file of files) {
      const newImage = await this.imageService.uploadS3(
        file.buffer,
        file.originalname,
      );
      images.push(newImage);
    }
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

  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
    files: Array<Express.Multer.File>,
  ) {
    updateMovieDto = removeEmpty(updateMovieDto);
    const movie = await this.findOne(id);
    const oldImage = [];
    movie.images.forEach(image => {
      oldImage.push({
        Key: image.fileName,
      })
    });
    const images = [];
    for await (const file of files) {
      const newImage = await this.imageService.uploadS3(
        file.buffer,
        file.originalname,
      );
      images.push(newImage);
    }
    updateMovieDto.images = images;
    this.movieRepository.assign(movie, updateMovieDto);
    this.imageService.deledeS3File(oldImage);
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
