import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  parentId?: number;
}
