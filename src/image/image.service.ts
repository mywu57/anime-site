import { Image } from './entities/image.entity';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class ImageService {
  async uploadS3(dataBuffer: Buffer, filename: string) {
    const s3 = this.getS3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: Date.now() + '-' + filename,
        ACL: 'public-read',
      })
      .promise();
    const newImage = new Image(uploadResult.Key, uploadResult.Location);
    return newImage;
  }

  async deledeS3File(objects: any) {
    const s3 = this.getS3();
    await s3
      .deleteObjects({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Delete: {
          Objects: objects,
        },
      })
      .promise();
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }
}
