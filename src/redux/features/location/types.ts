export interface Country {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
}

export interface CountriesState {
  countries: Country[];
  cities: string[];
  countriesError: string | null;
  citiesError: string | null;
}
