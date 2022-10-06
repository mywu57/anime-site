import { Migration } from '@mikro-orm/migrations';

export class Migration20221003081134 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "origin" ("id" serial primary key, "name" varchar(255) not null, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);',
    );
    this.addSql(
      'create index "origin_deleted_at_index" on "origin" ("deleted_at");',
    );

    this.addSql('alter table "movie" rename column "origin" to "origin_id";');
    this.addSql(
      'alter table "movie" add constraint "movie_origin_id_foreign" foreign key ("origin_id") references "origin" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "movie" drop constraint "movie_origin_id_foreign";',
    );

    this.addSql('drop table if exists "origin" cascade;');

    this.addSql('alter table "movie" rename column "origin_id" to "origin";');
  }
}
