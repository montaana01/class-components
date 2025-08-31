export type SourceDataType = {
  [countryName: string]: CountryDataType;
};

export type CountryDataType = {
  iso_code?: string;
  region?: string;
  data: YearDataType[];
};

export type YearDataType = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  iso_code?: string;
  region?: string;
  [key: string]: number | string | undefined;
};
