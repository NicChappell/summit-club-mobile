import { GeoJsonProperties } from "geojson";
import { ISQLResult } from "../../../../common/interfaces/index";

export interface IMarkerView extends GeoJsonProperties {
  /** Properties associated with a GeoJSON Feature */
  properties: ISQLResult;
}
