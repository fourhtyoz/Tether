import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Photo } from './entities/photo.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Profile, Photo, User])],
    controllers: [ProfilesController],
    providers: [ProfilesService],
})
export class ProfilesModule {}
