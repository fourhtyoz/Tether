import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Profile } from "./profile.entity";

@Entity('photos')
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Profile, profile => profile.photos)
    profile: Profile;

    @Column()
    url: string;

    @Column({ default: 0 })
    position: number;

    @Column({ default: false })
    isPrimary: boolean;

    @Column({ default: false })
    isVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;
}