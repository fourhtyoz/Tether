import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';

interface RequestWithUser extends Request {
    user: {
        id: string;
        email: string;
    };
}

@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @Post()
    create(
        @Req() req: RequestWithUser,
        @Body() createProfileDto: CreateProfileDto,
    ) {
        const userId = req.user.id;
        return this.profilesService.create(userId, createProfileDto);
    }

    @Get('me')
    async getMyProfile(
        @Req() req: RequestWithUser,
    ): Promise<ProfileResponseDto> {
        console.log('req.user', req.user)
        const userId = req.user.id;
        return this.profilesService.findOneByUserId(userId);
    }

    @Patch('me')
    async updateMyProfile(
        @Req() req: RequestWithUser,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Promise<ProfileResponseDto> {
        const userId = req.user.id;
        return this.profilesService.update(userId, updateProfileDto);
    }

    @Delete('me')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteMyProfile(@Req() req: RequestWithUser): Promise<void> {
        const userId = req.user.id;
        return this.profilesService.delete(userId);
    }

    @Get(':userId')
    async getPublicProfile(
        @Param('userId') userId: string,
    ): Promise<ProfileResponseDto> {
        return this.profilesService.findActiveOneByUserId(userId);
    }
}
