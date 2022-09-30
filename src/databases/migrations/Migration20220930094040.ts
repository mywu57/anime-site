import { Migration } from '@mikro-orm/migrations';

export class Migration20220930094040 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "movie" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) null, "category_id" int not null, "origin" int not null, "airing_status" int not null, "episode_count" int not null, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);',
    );
    this.addSql(
      'create index "movie_deleted_at_index" on "movie" ("deleted_at");',
    );

    this.addSql(
      'create table "tag" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) null, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);',
    );
    this.addSql('create index "tag_deleted_at_index" on "tag" ("deleted_at");');

    this.addSql(
      'create table "movie_tags" ("movie_id" int not null, "tag_id" int not null, constraint "movie_tags_pkey" primary key ("movie_id", "tag_id"));',
    );

    this.addSql(
      'alter table "movie" add constraint "movie_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "movie_tags" add constraint "movie_tags_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "movie_tags" add constraint "movie_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "movie_tags" drop constraint "movie_tags_movie_id_foreign";',
    );

    this.addSql(
      'alter table "movie_tags" drop constraint "movie_tags_tag_id_foreign";',
    );

    this.addSql('drop table if exists "movie" cascade;');

    this.addSql('drop table if exists "tag" cascade;');

    this.addSql('drop table if exists "movie_tags" cascade;');
  }
}
