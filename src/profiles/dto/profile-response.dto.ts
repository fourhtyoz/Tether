import { Exclude, Expose, Type } from 'class-transformer';

export class PhotoResponseDto {
    @Expose()
    id: string;

    @Expose()
    url: string;

    @Expose()
    isPrimary: boolean;

    @Expose()
    createdAt: Date;
}

export class ProfileResponseDto {
    @Expose()
    id: string;

    @Expose()
    userId: string;

    @Expose()
    firstName: string;

    @Expose()
    birthDate: Date;

    @Expose()
    bio: string;

    @Expose()
    isActive: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    @Type(() => PhotoResponseDto)
    photos: PhotoResponseDto[];

    @Expose()
    get age(): number | null {
        if (!this.birthDate) return null;
        const today = new Date();
        const birthDate = new Date(this.birthDate);
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

    @Exclude()
    user: any;
}
