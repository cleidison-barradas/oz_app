import { AddressCoordinates } from "../interfaces/user.interface";
import * as turf from "@turf/turf";

export class GeolocationService {
  constructor(
    private readonly geocodingApiUrl: string,
    private readonly reverseGeocodingApiUrl: string
  ) {}

  private async fetchApi(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Http Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching API: ${error.message}`);
    }
  }

  public async getCoordinatesFromAddress(
    address: string
  ): Promise<AddressCoordinates> {
    const url = new URL(this.geocodingApiUrl);

    url.searchParams.append("q", address);
    url.searchParams.append("format", "json");
    url.searchParams.append("limit", "1");

    const [data] = await this.fetchApi(url.toString());

    if (!data) throw new Error("Address not found");

    const lat = data?.lat || 0;
    const lng = data?.lon || 0;

    return { lat, lng };
  }

  public async getAddressFromCoordinates(
    lat: number,
    lng: number
  ): Promise<string> {
    const url = new URL(this.reverseGeocodingApiUrl);

    url.searchParams.append("lat", lat.toString());
    url.searchParams.append("lon", lng.toString());
    url.searchParams.append("format", "json");
    url.searchParams.append("limit", "1");

    const data = await this.fetchApi(url.toString());

    if (!data.display_name) throw new Error("Coordenates not found");

    return data.display_name;
  }
  public createPolygon(lat: number, lng: number, delta = 1) {
    const point = turf.point([lng, lat]);

    return {
      type: "Polygon",
      coordinates: turf.buffer(point, delta, { units: "kilometers" }).geometry
        .coordinates,
    };
  }
}
