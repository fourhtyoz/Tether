import { IsNotEmpty, IsEmail } from 'class-validator'

export class ForgotPasswordDto {
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Email is not valid' })
    email: string = ''
}