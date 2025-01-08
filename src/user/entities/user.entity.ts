import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Role } from '../../entities/role.entity';
import { UserRepository } from '../../repositories/user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ length: 50 })
  username!: string;

  @Property({ length: 50 })
  password!: string;

  @Property({ onCreate: () => new Date() })
  createTime: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updateTime: Date = new Date();

  // Many-to-Many relationship with Role
  @ManyToMany(() => Role, (role) => role.users, { owner: true })
  roles = new Collection<Role>(this);
}
