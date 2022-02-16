import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { WorldHolidayService } from "./world-holiday.service";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Holidays")
@Controller("holidays")
export class WorldHolidayController {
  constructor(private worldHolidayService: WorldHolidayService) {
  }

  @ApiOperation({ description: "Get supported countries.", summary: "Get supported countries." })
  @ApiResponse({ status: 200, description: "The record has been successfully got." })
  @ApiResponse({ status: 204, description: "No record found." })
  @Get("countries")
  public async getCountries(@Res() res) {
    const result = await this.worldHolidayService.getCountries();
    res.status(result.status).json(result.msg);
  }

  @ApiOperation({ description: "Get supported states e.g. for US.", summary: "Get supported states." })
  @ApiParam({ description: "Country Name", name: "countryName", example: "US" })
  @ApiResponse({ status: 200, description: "The record has been successfully got." })
  @ApiResponse({ status: 204, description: "No record found." })
  @Get("states/:countryName")
  public async getStates(@Param() param, @Res() res) {
    const countryName = param.countryName;
    const result = await this.worldHolidayService.getStates(countryName);
    res.status(result.status).json(result.msg);
  }

  @ApiOperation({ description: "Get supported regions e.g. for US, Lousiana.", summary: "Get supported regions." })
  @ApiParam({ description: "Country Name", name: "countryName", example: "US" })
  @ApiParam({ description: "State Name", name: "stateName", example: "la" })
  @ApiResponse({ status: 200, description: "The record has been successfully got." })
  @ApiResponse({ status: 204, description: "No record found." })
  @Get("regions/:countryName/:stateName")
  public async getRegion(@Param() param, @Res() res) {
    const stateName = param.stateName;
    const countryName = param.countryName;
    const result = await this.worldHolidayService.getRegions(countryName, stateName);
    res.status(result.status).json(result.msg);
  }

  @ApiOperation({ description: "Get all holidays for a given year.", summary: "Get all holidays for a given year." })
  @ApiParam({ description: "Country Name", name: "countryName", example: "US" })
  @ApiParam({ description: "Holidays Year", name: "year", example: "2022" })
  @ApiQuery({description: "State Name", name: "stateName", required: false, example: "la"})
  @ApiQuery({description: "Region Name", name: "regionName", required: false, example: "no"})
  @ApiResponse({ status: 200, description: "The record has been successfully got." })
  @ApiResponse({ status: 204, description: "No record found." })
  @Get("country/:countryName/:year")
  public async getCountryHolidays(
    @Param() param,
    @Query() query,
    @Res() res
  ) {
    const countryName = param.countryName;
    const year = param.year;

    const result = await this.worldHolidayService.getCountryHolidays(
      countryName,
      year,
      query
    );

    res.status(result.status).json(result.msg);
  }
}
