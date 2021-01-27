import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsOptional()
  @IsString()
  public avatar?: string;
}

export default CreateUserDto;
