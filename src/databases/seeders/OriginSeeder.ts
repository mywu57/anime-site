import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Origin } from '../../origin/entities/origin.entity';

export class OriginSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const originNames = ['Japan', 'China', 'Korea'];
    originNames.forEach((element) => {
      em.create(Origin, {
        name: element,
      });
    });
  }
}
