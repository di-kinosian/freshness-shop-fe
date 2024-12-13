import { RootState } from "../../app/store";

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectCities = (state: RootState) => state.countries.cities;
