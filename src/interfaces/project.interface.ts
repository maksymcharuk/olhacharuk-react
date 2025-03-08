import { IBaseStrapiDataCollection } from "./base-strapi-data.interface";
import { IImage } from "./image.interface";
import { ILink } from "./link.interface";
import { IListKeyValueItem } from "./list-key-value.interface";
import { IRichBlock } from "./rich-block.interface";

export type IProject = {
  name: string;
  description: IRichBlock;
  description_short: string;
  company: string;
  images: IBaseStrapiDataCollection<IImage>;
  images_grid: IBaseStrapiDataCollection<IImage>;
  details: IListKeyValueItem[];
  links: ILink[];
  slug: string;
};
