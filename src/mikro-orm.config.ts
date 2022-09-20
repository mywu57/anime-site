import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';
import { Category } from './category/category.entity';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

const logger = new Logger('MikroORM');
const MikroOrmConfig: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'anime',
  type: 'postgresql',
  user: 'postgres',
  password: '10242048',
  host: 'localhost',
  port: 5432,
  metadataProvider: TsMorphMetadataProvider,
  cache: { pretty: true },
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
};
export default MikroOrmConfig;
