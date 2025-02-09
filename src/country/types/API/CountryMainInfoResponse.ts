export type CountryMainInfoResponse = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[] | null;
};

export type Border = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
};