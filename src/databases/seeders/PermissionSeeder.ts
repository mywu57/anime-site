import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Permission } from '../../entities/permission.entity';

export class PermissionSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const perm1 = new Permission();
    perm1.name = 'Delete Category';

    const perm2 = new Permission();
    perm2.name = 'Edit Category';

    em.persist([perm1, perm2]);
  }

}
