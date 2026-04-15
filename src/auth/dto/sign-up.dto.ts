import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, IsStrongPassword } from 'class-validator';
import { Match } from '../validators/match.validator';

export const strongPasswordConfig = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1
}

export class SignUpDto {
    @IsNotEmpty({ message: 'Email cannot be empty'})
    @IsEmail({}, { message: 'Email is not valid' })
    email: string = ''

    @IsNotEmpty({ message: 'Password cannot be empty'})
    @IsStrongPassword(strongPasswordConfig, { message: 'Password is not strong enough' })
    password: string  = ''

    @IsNotEmpty({ message: 'Confirm password cannot be empty'})
    @Match('password', { message: 'Passwords do not match' })
    confirmPassword: string = ''

    @IsNotEmpty({ message: 'First name cannot be empty'})
    @IsString()
    @MinLength(2, { message: 'First name cannot be shorter than 2 characters' })
    @MaxLength(50, { message: 'First name cannot be shorter than 50 characters' })
    firstName: string = ''
}