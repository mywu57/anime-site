import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryDto {
  @Field()
  @IsString()
  public name: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  parentId?: number;
}
