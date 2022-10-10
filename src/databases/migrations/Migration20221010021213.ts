import { Migration } from '@mikro-orm/migrations';

export class Migration20221010021213 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "movie" add column "images" jsonb not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "movie" drop column "images";');
  }
}
