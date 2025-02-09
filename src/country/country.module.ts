import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './models/countries-list.model';
import { CountryService } from './country.service';
import { PopulationCount } from './models/counties-population.model';
import { CountryFlag } from './models/countries-flag.model';
import { HttpModule } from '@nestjs/axios';
import { CountryDataInit } from './country-data-init';

@Module({
  imports: [
    SequelizeModule.forFeature([Country,PopulationCount,CountryFlag]),
    HttpModule
  ],
  providers:[
    CountryService,
    CountryDataInit
  ],
  controllers: [CountryController]
})
export class CountryModule {}
