import { PopulationCount } from '../models/counties-population.model';

export type CountryDetailedInfo = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[] | null;
  populationCounts: PopulationCount[],
  flagUrl: string;
};

export type Border = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
};