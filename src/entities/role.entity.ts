import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { User } from '../user/entities/user.entity';
import { Permission } from './permission.entity';

@Entity({ tableName: 'role' })
export class Role {
  @PrimaryKey()
  id!: number;

  @Property({ length: 20 })
  name!: string;

  @Property({ onCreate: () => new Date() })
  createTime: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updateTime: Date = new Date();

  // Many-to-Many relationship with User
  @ManyToMany(() => User, (user) => user.roles)
  users = new Collection<User>(this);

  // Many-to-Many relationship with Permission
  @ManyToMany(() => Permission, (permission) => permission.roles, { owner: true })
  permissions = new Collection<Permission>(this);
}
