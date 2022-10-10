import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './uploadedFiles/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response = [];
    files.forEach((file) => {
      const fileRespone = {
        fileName: file.filename,
        path: file.path,
      };
      response.push(fileRespone);
    });
    return response;
  }

  @Get()
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploadedFiles' });
  }

  // @Post()
  // create(@Body() createImageDto: CreateImageDto) {
  //   return this.imageService.create(createImageDto);
  // }

  // @Get()
  // findAll() {
  //   return this.imageService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
