import { Module } from '@nestjs/common';
import { WorldHolidayService } from './world-holiday.service';
import { WorldHolidayController } from './world-holiday.controller';

@Module({
  providers: [WorldHolidayService],
  controllers: [WorldHolidayController],
  exports: [WorldHolidayService],
})
export class WorldHolidayModule {}
