import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

class UpdateKanjiViewDto {
  @IsNotEmpty()
  @IsMongoId()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public views: string;
}

export default UpdateKanjiViewDto;
