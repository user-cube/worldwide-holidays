import { Injectable } from '@nestjs/common';
const Holidays = require('date-holidays');

@Injectable()
export class WorldHolidayService {
  private holidays = new Holidays();

  public async getCountries(): Promise<Record<string, any>> {
    return this.holidays.getCountries();
  }

  public async getStates(stateName: string): Promise<Record<string, any>> {
    return this.holidays.getStates(stateName);
  }

  public async getRegions(
    stateName: string,
    regionName: string,
  ): Promise<Record<string, any>> {
    return this.holidays.getRegions(stateName, regionName);
  }

  public async getCountryHolidays(
    countryName: string,
    year: number,
    query: Record<string, any>,
  ): Promise<Record<string, any>> {
    console.log(typeof query);
    const keys = Object.keys(query);
    console.log(Object.keys(query));
    if (keys.includes('stateName')) {
      if (keys.includes('regionName')) {
        this.holidays = new Holidays(
          countryName,
          query.stateName,
          query.regionName,
        );
      } else {
        this.holidays = new Holidays(countryName, query.stateName);
      }
    } else {
      this.holidays = new Holidays(countryName);
    }

    return this.holidays.getHolidays(year);
  }
}
