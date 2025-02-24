export type CoordinateType = [number, number];

export type Coordinate = {
  type: "Polygon";
  coordinates: CoordinateType[][];
};

export interface CreateRegionDTO {
  name: string;
  user_id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface UpdateRegionDTO {
  name?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface QueryRegionsPointDTO {
  lat: string;
  lng: string;
}

export interface QueryRegionsNearbyPointDTO {
  lat: string;
  lng: string;
  maxDistance: string;
  excludeOwnerUserId?: string;
}
