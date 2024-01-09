import { IBaseStrapiEntity } from "./base-strapi-entity.interface";

export type Project = IBaseStrapiEntity<{
  id: number;
  name: string;
  description: string;
  images: string[];
}>;
