type FlagImage = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

export type FlagImagesAPIResponse = {
  error: boolean;
  msg: string;
  data: FlagImage[];
};
