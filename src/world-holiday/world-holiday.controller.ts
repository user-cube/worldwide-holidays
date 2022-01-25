import { Controller, Get, Param, Query } from '@nestjs/common';
import { WorldHolidayService } from './world-holiday.service';

@Controller('holidays')
export class WorldHolidayController {
  constructor(private worldHolidayService: WorldHolidayService) {}

  @Get('countries')
  public async getCountries(): Promise<Record<string, any>> {
    return this.worldHolidayService.getCountries();
  }

  @Get('states/:stateName')
  public async getStates(@Param() param): Promise<Record<string, any>> {
    const stateName = param.stateName;
    return this.worldHolidayService.getStates(stateName);
  }

  @Get('regions/:stateName/:regionName')
  public async getRegion(@Param() param): Promise<Record<string, any>> {
    const regionName = param.regionName;
    const stateName = param.stateName;
    return this.worldHolidayService.getRegions(stateName, regionName);
  }

  @Get('country/:countryName/:year')
  public async getCountryHolidays(
    @Param() param,
    @Query() query,
  ): Promise<Record<string, any>> {
    const countryName = param.countryName;
    const year = param.year;

    return this.worldHolidayService.getCountryHolidays(
      countryName,
      year,
      query,
    );
  }
}
