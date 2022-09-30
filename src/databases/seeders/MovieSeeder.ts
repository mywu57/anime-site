import { Origin } from './../../origin/entities/origin.entity';
import type { EntityManager } from '@mikro-orm/core';
import { faker, Seeder } from '@mikro-orm/seeder';
import { Category } from '../../category/entities/category.entity';
import { Movie } from '../../movie/entities/movie.entity';

export class MovieSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const masterSeed = [
      'Mahouka Koukou no Rettousei',
      'Calligraffiti',
      'G-taste (2010)',
      'Kabocha no Oji-san',
      'Kabukichou Sherlock (2020)',
      'Kaeru no Yume',
      'Radiant (2019)',
      'Rail Romanesque',
    ];
    const categories: Category[] = await em.find(Category, {});
    const origins: Origin[] = await em.find(Origin, {});

    masterSeed.forEach((element) => {
      em.create(Movie, {
        name: element,
        category: faker.helpers.arrayElement(categories),
        origin: faker.helpers.arrayElement(origins),
        airingStatus: faker.datatype.number({ min: 1, max: 3 }),
        episodeCount: faker.datatype.number({ min: 12, max: 24 }),
      });
    });
  }
}
