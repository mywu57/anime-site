import { Image } from './entities/image.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

export class ImageRepository extends EntityRepository<Image> {

}