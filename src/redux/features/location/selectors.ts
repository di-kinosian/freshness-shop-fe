import { RootState } from "../../app/store";

export const selectCountries = (state: RootState) => state.location.countries;
export const selectCities = (state: RootState) => state.location.cities;
