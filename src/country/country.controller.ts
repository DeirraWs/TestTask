import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './models/countries-list.model';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/available')
  async getAvailableCountries(): Promise<Country[]> {
    return await this.countryService.getCountryList();
  }

  @Get('/info') //CountryDetailedInfo
  async getCountryInfo(
    @Query('countryName') countryName: string,
    @Query("countryCode") countryCode: string,
    ): Promise<any> {
    return await this.countryService.getDetailedInformationCountry(countryName,countryCode);
  }
}