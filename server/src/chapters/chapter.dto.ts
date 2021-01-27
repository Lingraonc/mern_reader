import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

class CreateChapterDto {
  @IsNotEmpty()
  @IsNumber()
  public number: number;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsOptional()
  @IsBoolean()
  public isVisible?: boolean;

  @IsOptional()
  @IsNumber()
  public price?: number;
}

export default CreateChapterDto;
