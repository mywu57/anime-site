import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '../user/entities/user.entity';

export class UserRepository extends EntityRepository<User> {}
