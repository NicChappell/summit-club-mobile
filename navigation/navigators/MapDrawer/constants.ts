import { IMapFilter } from "../../../contexts/interfaces";

export const maxElevation = 14426; // Elevation of Mount Elbert according to GNIS database

export const initMapFilters: IMapFilter = {
  maxElevation: maxElevation,
  above14: true,
  between13and14: true,
  between12and13: false,
  between11and12: false,
  between10and11: false,
  below10: false,
  countiesOverlay: false,
};
