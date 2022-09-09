export interface CityDataType {
  id: string;
  name: string;
  slug: string;
}

export interface DistrictDataType {
  id: string;
  name: string;
  slug: string;
  city: CityDataType;
}

export interface WardDataType {
  id: string;
  name: string;
  slug: string;
  district: DistrictDataType;
}

export interface LocationDataType {
  city: CityDataType;
  district: DistrictDataType;
  ward: WardDataType;
  street: string;
  map: string;
}
