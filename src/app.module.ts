import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot()], // подключение ConfigModule для работы .env
})
export class AppModule {}
