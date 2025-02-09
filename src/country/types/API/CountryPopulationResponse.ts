type PopulationCount = {
  year: number;
  value: number;
};

type CountryPopulationData = {
  country: string;
  iso3: string;
  populationCounts: PopulationCount[];
};

export type CountryPopulationApiResponse = {
  error: boolean;
  msg: string;
  data: CountryPopulationData[];
};