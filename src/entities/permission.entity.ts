import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Role } from './role.entity';

@Entity({ tableName: 'permission' })
export class Permission {
  @PrimaryKey()
  id!: number;

  @Property({ length: 50 })
  name!: string;

  @Property({ length: 100, nullable: true })
  desc?: string;

  @Property({ onCreate: () => new Date() })
  createTime: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updateTime: Date = new Date();

  // Many-to-Many relationship with Role
  @ManyToMany(() => Role, (role) => role.permissions)
  roles = new Collection<Role>(this);
}
