import { IsString, IsDate, IsOptional, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDto {
    @IsDate({ message: 'Birth date must be a valid date' })
    @Type(() => Date)
    @IsNotEmpty({ message: 'Birth date is required' })
    birthDate: Date;

    @IsString()
    @IsOptional()
    @MaxLength(500, { message: 'Bio must be less than 500 characters' })
    bio?: string;
}
