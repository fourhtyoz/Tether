import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT ?? 2000);
}
bootstrap().catch((e) => console.error('Error whle bootstrapping the app', e));
