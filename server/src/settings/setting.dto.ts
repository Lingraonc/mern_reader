import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateSettingDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public value?: string;

  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public isEditable: boolean;
}

export default CreateSettingDto;
