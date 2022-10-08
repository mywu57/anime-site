import { Base } from './../../utils/entities/base.entity';
import { ImageRepository } from './../image.repository';
import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ customRepository: () => ImageRepository })
export class Image extends BaseEntity<Image, 'id'>{
    @PrimaryKey()
    public id: number;

    @Property()
    fileName!: string;

    @Property()
    entity!: string;

    @Property()
    entityId!: number;

    @Property({ hidden: true })
    createAt: Date = new Date();
  
    @Property({ hidden: true, onUpdate: () => new Date() })
    updateAt: Date = new Date();

    constructor(fileName: string, entity: any) {
        super();
        this.fileName = fileName;
        this.entity = entity.constructor.name;
        this.entityId = entity.id
    }
}
