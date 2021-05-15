import { Feature, Geometry, GeoJsonProperties } from "geojson";

export interface ISearchResultsListItem {
  /** Summit record data */
  item: Feature<Geometry, GeoJsonProperties>;
}
