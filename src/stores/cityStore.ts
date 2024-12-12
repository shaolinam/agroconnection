import { defineStore } from "pinia";
import { reactive } from "vue";
import { ICity } from "../domain/entities/ICity";

export const cityStore = defineStore("cityStore", () => {
  const state = reactive({
    cities: [] as ICity[],
    filtro: "",
  });

  const getCities = () => {
    if (state.filtro.length == 0) return state.cities;
    const filtro = state.filtro.toUpperCase();
    return state.cities.filter(
      (c) => c.name.toUpperCase().indexOf(filtro) >= 0
    );
  };

  const setCities = (cities: ICity[]): Promise<boolean> => {
    return new Promise((resolve) => {
      state.cities = cities;
      resolve(true);
    });
  };

  return {
    state,
    getCities,
    setCities,
  };
});
