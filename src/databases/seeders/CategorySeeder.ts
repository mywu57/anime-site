import type { EntityManager } from '@mikro-orm/core';
import { faker, Seeder } from '@mikro-orm/seeder';
import { Category } from '../../category/entities/category.entity';

export class CategorySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const masterSeed = [
      'TV seris',
      'Movies',
      'OVA',
      'Music Video',
      'TV Special',
      'Other',
    ];
    masterSeed.forEach((element) => {
      em.create(Category, {
        name: element,
      });
    });
  }
}
