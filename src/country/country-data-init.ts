import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { CountryPopulationApiResponse } from './types/API/CountryPopulationResponse';
import { AvailableCountriesAPIResponse } from './types/API/AviableCountryResponse';
import { FlagImagesAPIResponse } from './types/API/CountryFlagResponse';
import { InjectModel } from '@nestjs/sequelize';
import { CountryFlag } from './models/countries-flag.model';
import { Country } from './models/countries-list.model';
import { PopulationCount } from './models/counties-population.model';

@Injectable()
export class CountryDataInit implements OnModuleInit {

  constructor(
    @InjectModel(CountryFlag) private _countryFlagModel: typeof CountryFlag,
    @InjectModel(Country) private _countryModel: typeof Country,
    @InjectModel(PopulationCount) private _countryPopulationModel: typeof PopulationCount,
  ) {
  }

  async onModuleInit() {
    await Promise.all([
      await this._fetchAndStorePopulationData(),
      await this._fetchAndStoreAvailableCountryData(),
      await this._fetchAndStoreCountryFlagData(),
    ]);
  }

  private async _fetchAndStorePopulationData() {
    try {
      const { data } = await axios.get<CountryPopulationApiResponse>('https://countriesnow.space/api/v0.1/countries/population');

      if (data?.data) {
        const countries = data.data;

        await Promise.all(
          countries.map(async (country) => {
            country.populationCounts.map(async (population) => {
              await this._countryPopulationModel.create({
                countryName: country.country,
                year: population.year,
                value: population.value,
              });
            });
          }),
        );

      } else {
        console.error('No data to save error');
      }
    } catch (e) {
      console.error('Error getting data', e);
    }
  }

  private async _fetchAndStoreAvailableCountryData() {
    try {
      const { data } = await axios.get<AvailableCountriesAPIResponse>('https://date.nager.at/api/v3/AvailableCountries');
      await Promise.all(
        data.map(async (availableCountry) => {
          await this._countryModel.create({
            name: availableCountry.name,
            countryCode: availableCountry.countryCode,
          });
        }),
      );
    } catch (e) {
      console.error('Error getting data', e);
    }
  }

  private async _fetchAndStoreCountryFlagData() {
    try {
      const { data } = await axios.get<FlagImagesAPIResponse>('https://countriesnow.space/api/v0.1/countries/flag/images');
      await Promise.all(
        data.data.map(async (flagImage) => {
          await this._countryFlagModel.create({
            countryName: flagImage.name,
            flagURL: flagImage.flag,
          });
        }),
      );
    } catch (e) {
      console.error('Error getting data', e);
    }
  }
}