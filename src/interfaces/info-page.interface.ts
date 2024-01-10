import { IExperience } from "./experience.interface";
import { ILink } from "./link.interface";
import { IRichBlock } from "./rich-block.interface";
import { IText } from "./text.interface";

export interface IInfoPage {
  clients: IText[];
  description: IRichBlock;
  experience: IExperience[];
  links: ILink[];
  published_work: ILink[];
}
