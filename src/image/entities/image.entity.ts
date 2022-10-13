import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class Image {
  @Property()
  fileName!: string;

  @Property()
  path!: string;

  @Property({ hidden: true })
  public createAt: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  public updateAt: Date = new Date();

  constructor(fileName: string, path: string) {
    this.fileName = fileName;
    this.path = path;
  }
}
