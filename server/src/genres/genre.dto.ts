import { IsNotEmpty, IsString} from 'class-validator';

class CreateGenreDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

}

export default CreateGenreDto;