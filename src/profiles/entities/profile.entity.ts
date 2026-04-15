import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Photo } from './photo.entity';

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 50 })
    firstName: string; // denormalized field

    @Column({ type: 'date', nullable: false })
    birthDate: Date;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'uuid', nullable: false })
    userId: string;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Photo, (photo) => photo.profile)
    photos: Photo[];
}
