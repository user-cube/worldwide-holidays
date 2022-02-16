import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { WorldHolidayService } from './world-holiday.service';

@Controller('holidays')
export class WorldHolidayController {
  constructor(private worldHolidayService: WorldHolidayService) {}

  @Get('countries')
  public async getCountries(@Res() res){
    const result = await this.worldHolidayService.getCountries();
    res.status(result.status).json(result.msg)
  }

  @Get('states/:stateName')
  public async getStates(@Param() param, @Res() res){
    const stateName = param.stateName;
    const result = await this.worldHolidayService.getStates(stateName);
    res.status(result.status).json(result.msg)
  }

  @Get('regions/:stateName/:regionName')
  public async getRegion(@Param() param, @Res() res){
    const regionName = param.regionName;
    const stateName = param.stateName;
    const result = await this.worldHolidayService.getRegions(stateName, regionName);
    res.status(result.status).json(result.msg)
  }

  @Get('country/:countryName/:year')
  public async getCountryHolidays(
    @Param() param,
    @Query() query,
    @Res() res
  ){
    const countryName = param.countryName;
    const year = param.year;

    const result = await this.worldHolidayService.getCountryHolidays(
      countryName,
      year,
      query,
    );

    res.status(result.status).json(result.msg)
  }
}
