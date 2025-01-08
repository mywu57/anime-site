import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../../user/entities/user.entity';

export class UserSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const user1 = new User();
    user1.username = 'admin';
    user1.password = 'password';

    const user2 = new User();
    user2.username = 'user';
    user2.password = 'password';

    em.persist([user1, user2]);
  }

}
