import { LoggerModule } from './logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorldHolidayModule } from './world-holiday/world-holiday.module';
import configuration from './config/configuration';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    WorldHolidayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
