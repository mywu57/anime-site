import { TagSeeder } from './TagSeeder';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { CategorySeeder } from './CategorySeeder';
import { MovieSeeder } from './MovieSeeder';
import { OriginSeeder } from './OriginSeeder';
import { PermissionSeeder } from './PermissionSeeder';
import { UserSeeder } from './UserSeeder';
import { RoleSeeder } from './RoleSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      CategorySeeder,
      TagSeeder,
      OriginSeeder,
      MovieSeeder,
      UserSeeder,
      RoleSeeder,
      PermissionSeeder,
    ]);
  }
}
