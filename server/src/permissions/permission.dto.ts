import { IsNotEmpty, IsString } from "class-validator";

class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}

export default CreatePermissionDto;
