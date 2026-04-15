import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) {}
    users = [
        {   
            'id': '1',
            'email': 'admin@gmail.com',
            'password': '123456'
        },
        {   
            'id': '2',
            'email': 'test@gmail.com',
            'password': '111111'
        }
    ]

    async create(signUpDto: SignUpDto): Promise<User> {
        const user = this.usersRepository.create(signUpDto)
        const savedUser =  await this.usersRepository.save(user)
        return savedUser
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async findByEmail(email: string) {
        return this.usersRepository.findOneBy({ email })
    }
}
