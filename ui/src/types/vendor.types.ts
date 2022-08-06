export interface VendorResponse {
  uid: string;
  link: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  cover?: string;
  images?: string[];
  avatar?: string;
  ratingTotal?: number;
  ratingCount?: number;
}

export interface VendorSearchParams {
  latitude: number;
  longitude: number;
  distance?: number;
  // sorting?: {
  //   // todo: add more sort fields like "distance", "price"
  //   field: keyof Pick<VendorResponse, 'rating'>;
  //   asc: boolean;
  // };
  filters?: { [key: string]: any };
  // should be keyof maxDistance, maxPrice, minPrice, minRating,
}
