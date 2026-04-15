import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: +configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: true,
        }),
        inject: [ConfigService]
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context }) => {
              return `${timestamp} [${context}] ${level}: ${message}`;
            }),
          ),
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    AuthModule,
    UsersModule,
    ProfilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
