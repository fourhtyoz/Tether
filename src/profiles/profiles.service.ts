import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Profile)
        private readonly profilesRepository: Repository<Profile>,
    ) {}

    private calculateAge(birthDate: Date): number {
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    }

    private toResponseDto(profile: Profile): ProfileResponseDto {
        return plainToClass(ProfileResponseDto, profile, {
            excludeExtraneousValues: true,
        });
    }

    async create(
        userId: string,
        createProfileDto: CreateProfileDto,
    ): Promise<ProfileResponseDto> {
        const user = await this.usersRepository.findOneBy({ id: userId });

        if (!user) throw new NotFoundException('User not found');

        const existingProfile = await this.profilesRepository.findOneBy({
            userId: userId,
        });

        if (existingProfile)
            throw new ConflictException('User already has a profile');

        // must be over 18
        const birthDate = new Date(createProfileDto.birthDate);
        const age = this.calculateAge(birthDate);
        if (age < 18)
            throw new BadRequestException(
                'You must be at least 18 years old to create a profile',
            );
        if (age > 100) throw new BadRequestException('Invalid birth date');

        // create
        const profile = this.profilesRepository.create({
            ...createProfileDto,
            firstName: user.firstName,
            userId: user.id,
        });

        const savedProfile = await this.profilesRepository.save(profile);

        return this.toResponseDto(savedProfile);
    }

    async findOneByUserId(userId: string): Promise<ProfileResponseDto> {
        const profile = await this.profilesRepository.findOne({
            where: { userId: userId },
            relations: ['photos'],
            order: {
                photos: {
                    position: 'ASC',
                },
            },
        });

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        return this.toResponseDto(profile);
    }

    async findActiveOneByUserId(userId: string): Promise<ProfileResponseDto> {
        const profile = await this.profilesRepository.findOne({
            where: { userId: userId, isActive: true },
            relations: ['photos'],
            order: {
                photos: {
                    position: 'ASC',
                },
            },
        });

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        // TODO: maybe hide some other info

        return this.toResponseDto(profile);
    }

    async update(
        userId: string,
        updateProfileDto: UpdateProfileDto,
    ): Promise<ProfileResponseDto> {
        const profile = await this.profilesRepository.findOneBy({ userId });
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        Object.assign(profile, updateProfileDto);

        await this.profilesRepository.save(profile);
        const updatedProfile = await this.findOneByUserId(userId);
        return updatedProfile;
    }

    async delete(userId: string): Promise<void> {
        const profile = await this.profilesRepository.findOneBy({
            userId: userId,
        });
        if (!profile) throw new NotFoundException('Profile not found');
        profile.isActive = false;
        await this.profilesRepository.save(profile);
    }
}
