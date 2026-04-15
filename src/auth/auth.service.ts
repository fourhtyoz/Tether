import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email)
        if (!user) return null
        if (user.password !== pass) return null

        const { password, ...result } = user
        return result
    }

    async signUp(signUpDto: SignUpDto) {
        const user = await this.usersService.create(signUpDto)
        const { password, ...result } = user
        return result
    }

    login(user: any) {
        const payload = { email: user.email, sub: user.id }
        const accessToken = this.jwtService.sign(payload)

        console.log('payload', payload)
        console.log('accessToken', accessToken)
        return { accessToken }
    }

    logout(user: any) {
        // TODO: удалить refresh куку + удалить рефреш токен на фронте
        console.log(`logout ${user}`)
    }

    // refreshToken(refreshToken: string) {
    //     console.log(`refreshToken ${refreshToken}`)
    // }

    forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        console.log(`forgotPassword`, forgotPasswordDto)
    }

    changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
        console.log(`changePassword`, userId, changePasswordDto)
    }
}
