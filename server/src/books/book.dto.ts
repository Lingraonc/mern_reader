import {IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';

class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString({each: true})
    public alternativeNames?: string[];

    @IsOptional()
    @IsMongoId({each: true})
    public tags?: string[];

    @IsOptional()
    @IsMongoId({each: true})
    public genres?: string[];

    @IsNotEmpty()
    @IsString()
    public description: string;


    @IsOptional()
    @IsString()
    public parsingLink?: string;

    @IsNotEmpty()
    @IsMongoId()
    public creatorId: string;

    @IsOptional()
    @IsMongoId({each: true})
    public editors?: string[];


    @IsOptional()
    @IsString()
    public titleImage?: string;

    @IsOptional()
    @IsString({each: true})
    public images?: string[];
}

export default CreateBookDto;