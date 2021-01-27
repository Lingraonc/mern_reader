import { IsNotEmpty, IsString } from "class-validator";

class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
  @IsNotEmpty()
  @IsString({ each: true })
  public permissions: string[];
}

export default CreateRoleDto;
