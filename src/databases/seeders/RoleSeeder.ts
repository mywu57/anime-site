import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../../entities/role.entity';

export class RoleSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const roleAdmin = new Role();
    roleAdmin.name = 'Admin';

    const roleUser = new Role();
    roleUser.name = 'User';

    em.persist([roleAdmin, roleUser]);
  }

}
