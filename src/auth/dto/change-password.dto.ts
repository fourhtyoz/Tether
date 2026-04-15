import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'
import { Match } from '../validators/match.validator'
import { strongPasswordConfig } from './sign-up.dto'
import { NotMatch } from '../validators/notMatch.validator'


export class ChangePasswordDto {
    @IsNotEmpty({ message: 'Old password cannot be empty' })
    @IsString()
    oldPassword: string = ''
    
    @IsNotEmpty({ message: 'New password cannot be empty'})
    @IsStrongPassword(strongPasswordConfig, { message: 'Password is not strong enough' })
    @NotMatch('oldPassword', { message: 'New password cannot match your old password'}) // not sure how secure this is
    newPassword: string = ''

    @IsNotEmpty({ message: 'Confirm password cannot be empty'})
    @Match('newPassword', { message: 'Passwords do not match' })
    confirmNewPassword: string = ''
}