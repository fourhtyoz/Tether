import { Profile } from "src/profiles/entities/profile.entity";
import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, length: 50 })
    firstName: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    lastLoginAt: Date

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: true })
    isActive: boolean

    @Column({ default: false })
    isBanned: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Profile)
    profile: Profile
}