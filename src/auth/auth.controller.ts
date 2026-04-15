import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import type { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request) {
        const user = req.user
        return this.authService.login(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Req() request: Request) {
        const user = request.user
        console.log('logout user', user)
        return this.authService.logout(user)
    }

    // TODO: достаем из куки рефреш токен 
    // @Post('refresh-token')
    // async refreshToken(
    //     @Req() request: Request, 
    //     @Body() refreshTokenDto: RefreshTokenDto
    // ) {
    //     const userId = request.user.id
    //     return this.authService.refreshToken(userId, refreshTokenDto.refreshToken)
    // }

    @Post('forgot-password')
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto)

    }
    
    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    changePassword(
        @Req() request: Request, 
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        // const userId = request.user.id
        const userId = '1'
        return this.authService.changePassword(userId, changePasswordDto)
    }
}
