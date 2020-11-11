import { IsNotEmpty, IsString} from 'class-validator';

class CreateTagDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

}

export default CreateTagDto;