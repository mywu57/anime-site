import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/file-upload.utils';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 20, multerOptions()))
  create(@Body() createMovieDto: CreateMovieDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.movieService.create(createMovieDto, files);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 20, multerOptions()))
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.movieService.update(+id, updateMovieDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string) {
    return this.movieService.restore(+id);
  }
}
