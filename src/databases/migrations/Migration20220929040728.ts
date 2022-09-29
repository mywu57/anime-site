import { Migration } from '@mikro-orm/migrations';

export class Migration20220929040728 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "category" ("id" serial primary key, "name" varchar(255) not null, "parent_id" int null, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);',
    );
    this.addSql(
      'create index "category_deleted_at_index" on "category" ("deleted_at");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "category" cascade;');
  }
}
