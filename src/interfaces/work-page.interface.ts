import { IBaseStrapiDataCollection } from "./base-strapi-data.interface";
import { IProject } from "./project.interface";

export interface IWorkPage {
  projects: IBaseStrapiDataCollection<IProject>;
}
