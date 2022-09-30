import { TagSeeder } from './TagSeeder';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { CategorySeeder } from './CategorySeeder';
import { MovieSeeder } from './MovieSeeder';
import { OriginSeeder } from './OriginSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      CategorySeeder,
      TagSeeder,
      OriginSeeder,
      MovieSeeder,
    ]);
  }
}
