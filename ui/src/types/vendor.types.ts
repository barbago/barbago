import { Coordinates } from './map.types';

export interface VendorResponse {
  uid: string;
  name?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  cover?: string;
  images?: string[];
  avatar?: string;
  rating?: string;
  ratings?: number;
}

export interface VendorSearchParams {
  coordinates?: Coordinates;
  sorting?: string;
  filters?: { [key: string]: any };
  // should be keyof maxDistance, maxPrice, minPrice, minRating,
}
