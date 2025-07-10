import { IsIn, IsNotEmpty, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class PartItem {
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  quantity!: number;
}

export class CreatePartDto {
  @IsNotEmpty()
  name!: string;

  @IsIn(["RAW", "ASSEMBLED"])
  type!: "RAW" | "ASSEMBLED";

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartItem)
  parts!: PartItem[];
}

