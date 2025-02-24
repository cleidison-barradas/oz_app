import { add } from "winston";
import { AddressCoordinates } from "../interfaces/user.interface";
import * as turf from "@turf/turf";

export class GeolocationService {
  constructor(
    private readonly geocodingApiUrl: string,
    private readonly reverseGeocodingApiUrl: string,
    private readonly geocodingApiKey: string,
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
    address: string,
  ): Promise<AddressCoordinates> {
    const url = new URL(this.geocodingApiUrl);

    url.searchParams.append("address", address);
    url.searchParams.append("key", this.geocodingApiKey);

    const { results, status } = await this.fetchApi(url.toString());

    if (status !== "OK") {
      throw new Error("Address not found");
    }

    const location = results[0]?.geometry?.location;

    const lat = location?.lat || 0;
    const lng = location?.lng || 0;

    return { lat, lng };
  }

  public async getAddressFromCoordinates(
    lat: number,
    lng: number,
  ): Promise<string> {
    const url = new URL(this.reverseGeocodingApiUrl);

    url.searchParams.append(
      "latlng",
      `${lat.toString().trim()},${lng.toString().trim()}`,
    );
    url.searchParams.append("key", this.geocodingApiKey);

    const { results, status } = await this.fetchApi(url.toString());

    if (status !== "OK") {
      throw new Error("Coordenates not found");
    }

    const formated_address = results[0]?.formated_address;

    return formated_address;
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
