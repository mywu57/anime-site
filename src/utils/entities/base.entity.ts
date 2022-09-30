import { BaseEntity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import WithSoftDelete from '../decorator/soft-delete.decorator';

@WithSoftDelete()
export class Base<T extends { id: number }> extends BaseEntity<T, 'id'> {
  @PrimaryKey()
  public id: number;

  @Property({ hidden: true })
  public createAt: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  public updateAt: Date = new Date();

  @Index()
  @Property({ hidden: true, nullable: true, type: 'timestamptz' })
  public deletedAt?: Date;

  constructor(body = {}) {
    super();
    this.assign(body);
  }
}
