import { IBaseStrapiEntity } from "./base-strapi-entity.interface";

export interface IBaseStrapiData<T> {
  data: IBaseStrapiEntity<T>;
}

export interface IBaseStrapiDataCollection<T> {
  data: IBaseStrapiEntity<T>[];
}
