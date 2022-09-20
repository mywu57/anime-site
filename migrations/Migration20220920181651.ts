import { Migration } from '@mikro-orm/migrations';

export class Migration20220920181651 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" serial primary key, "name" varchar(255) not null, "parent_id" int null, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "category" cascade;');
  }

}
