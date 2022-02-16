import { Injectable } from "@nestjs/common";

const Holidays = require("date-holidays");

@Injectable()
export class WorldHolidayService {
  private holidays = new Holidays();

  private _responseFormatter = (response: Record<string, any>): Record<string, any> => {
    if (typeof response === "undefined" || typeof response === null || Object.keys(response).length === 0) {
      return {
        status: 204,
        msg: "No content for the given request."
      };
    }
    return {
      status: 200,
      msg: response
    };
  };

  public async getCountries(): Promise<Record<string, any>> {
    return this._responseFormatter(this.holidays.getCountries());
  }

  public async getStates(countryName: string): Promise<Record<string, any>> {
    return this._responseFormatter(this.holidays.getStates(countryName));
  }

  public async getRegions(
    countryName: string,
    stateName: string
  ): Promise<Record<string, any>> {
    console.log(this.holidays.getRegions(countryName, stateName))
    return this._responseFormatter(this.holidays.getRegions(countryName, stateName));
  }

  public async getCountryHolidays(
    countryName: string,
    year: number,
    query: Record<string, any>
  ): Promise<Record<string, any>> {
    const keys = Object.keys(query);
    if (keys.includes("stateName")) {
      if (keys.includes("regionName")) {
        this.holidays = new Holidays(
          countryName,
          query.stateName,
          query.regionName
        );
      } else {
        this.holidays = new Holidays(countryName, query.stateName);
      }
    } else {
      this.holidays = new Holidays(countryName);
    }

    return this._responseFormatter(this.holidays.getHolidays(year));
  }
}
