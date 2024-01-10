import {
  IBaseStrapiData,
  IBaseStrapiDataCollection,
} from "./base-strapi-data.interface";

interface IStrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export type IBaseStrapiResponse<T> = IBaseStrapiData<T> & IStrapiMeta;
export type IBaseStrapiCollectionResponse<T> = IBaseStrapiDataCollection<T> &
  IStrapiMeta;
