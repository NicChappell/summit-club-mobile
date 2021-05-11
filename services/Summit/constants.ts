import { IBounds, IQueryParams } from "./types";

export const defaultBounds: IBounds = {
  northEast: {
    latitude: 41.003906, // northeast latitude coordinate
    longitude: -102.042974, // northeast longitude coordinate
  },
  southWest: {
    latitude: 36.994786, // southwest latitude coordinate
    longitude: -109.058934, // southwest longitude coordinate
  },
};

export const defaultQueryParams: IQueryParams = {
  bounds: defaultBounds,
  filters: "",
  orderBy: "DESC",
  limit: 64,
  offset: 0,
};
