import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CountryFlag } from './models/countries-flag.model';
import { Country } from './models/countries-list.model';
import { PopulationCount } from './models/counties-population.model';
import axios, { AxiosResponse } from 'axios';
import { CountryMainInfoResponse } from './types/API/CountryMainInfoResponse';
import { CountryDetailedInfo } from './types/CountryDetailedInformation';
import { CountryPopulationApiResponse } from './types/API/CountryPopulationResponse';
import { AvailableCountriesAPIResponse } from './types/API/AviableCountryResponse';
import { FlagImagesAPIResponse } from './types/API/CountryFlagResponse';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CountryService {

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(CountryFlag) private _countryFlagModel: typeof CountryFlag,
    @InjectModel(Country) private _countryModel: typeof Country,
    @InjectModel(PopulationCount) private _countryPopulationModel: typeof PopulationCount,
  ) {

  }

  async getCountryList(): Promise<Country[]> {
    try {
      return await this._countryModel.findAll();
    } catch (e) {
      console.error(e);
      throw new HttpException('getCountryList error', 500);
    }
  }

  async getDetailedInformationCountry(countryName: string, countryCode: string): Promise<CountryDetailedInfo> {
    const [MainData, populationCount, flagUrl] = await Promise.all([
      await this._getCountryMainData(countryCode),
      await this._getPopulationCounts(countryName),
      await this._getFlagUrl(countryName),
    ]);
    return { ...MainData.data, populationCounts: populationCount, flagUrl: flagUrl };
  }

  private async _getCountryMainData(countryCode: string):  Promise<AxiosResponse<CountryMainInfoResponse, any>> {
    try {
      console.log(countryCode);
      return this.httpService.axiosRef.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
    } catch (e) {
      console.error(e);
      throw new HttpException('getCountryMainData failed', 500);
    }

  }

  private async _getPopulationCounts(countryName: string): Promise<PopulationCount[]> {
    try {
      return this._countryPopulationModel.findAll({
        where: {
          countryName: countryName,
        },
      });
    } catch (e) {
      console.error(e);
      throw new HttpException('Error getting counts list', 500);
    }
  }

  private async _getFlagUrl(countryName: string): Promise<string> {
    try {
      const flagUrl = await this._countryFlagModel.findOne({
        where: {
          countryName: countryName,
        },
      });

      if (!flagUrl) {
        console.error('Could not find flag url');
        return ""
      }

      return flagUrl.flagURL;
    } catch (e) {
      console.error('Could not find flag url');
      throw new HttpException('Could not find flag url', 500);
    }
  }
}
