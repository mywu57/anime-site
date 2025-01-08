import { Migration } from '@mikro-orm/migrations';

export class Migration20250108135811 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "permission" ("id" serial primary key, "name" varchar(50) not null, "desc" varchar(100) null, "create_time" timestamptz(0) not null, "update_time" timestamptz(0) not null);');

    this.addSql('create table "role" ("id" serial primary key, "name" varchar(20) not null, "create_time" timestamptz(0) not null, "update_time" timestamptz(0) not null);');

    this.addSql('create table "role_permissions" ("role_id" int not null, "permission_id" int not null, constraint "role_permissions_pkey" primary key ("role_id", "permission_id"));');

    this.addSql('create table "user" ("id" serial primary key, "username" varchar(50) not null, "password" varchar(50) not null, "create_time" timestamptz(0) not null, "update_time" timestamptz(0) not null);');

    this.addSql('create table "user_roles" ("user_id" int not null, "role_id" int not null, constraint "user_roles_pkey" primary key ("user_id", "role_id"));');

    this.addSql('alter table "role_permissions" add constraint "role_permissions_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "role_permissions" add constraint "role_permissions_permission_id_foreign" foreign key ("permission_id") references "permission" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_roles" add constraint "user_roles_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_roles" add constraint "user_roles_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "role_permissions" drop constraint "role_permissions_permission_id_foreign";');

    this.addSql('alter table "role_permissions" drop constraint "role_permissions_role_id_foreign";');

    this.addSql('alter table "user_roles" drop constraint "user_roles_role_id_foreign";');

    this.addSql('alter table "user_roles" drop constraint "user_roles_user_id_foreign";');

    this.addSql('drop table if exists "permission" cascade;');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "role_permissions" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "user_roles" cascade;');
  }

}
