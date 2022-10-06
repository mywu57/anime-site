import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Tag } from '../../tag/entities/tag.entity';

export class TagSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const masterSeed = [
      'Action',
      'Adventure',
      'Bishojo/Moe',
      'Harem',
      'Fantasy',
      'Ecchi',
      'NTR',
      'School',
      'Parody',
      'Shounen',
      'Seinen',
      'Detective',
      'Hikikomori',
      'Tokusatsu',
    ];
    masterSeed.forEach((element) => {
      em.create(Tag, {
        name: element,
      });
    });
  }
}
