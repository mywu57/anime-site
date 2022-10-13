import { extname } from 'path';
import { diskStorage } from 'multer';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.filename.split('.')[0];
  const fileExtName = extname(file.filename);
  callback(null, `${name}-${Date.now()}${fileExtName}`);
};

export const multerOptions = () => {
  return {
    storage: diskStorage({
      destination: './uploadedFiles/images',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  };
};
