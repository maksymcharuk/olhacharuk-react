import { ReactImageGalleryItem } from "react-image-gallery";
import { IBaseStrapiDataCollection } from "../../interfaces/base-strapi-data.interface";
import { IImage } from "../../interfaces/image.interface";

export const getGalleryImages = (
  images: IBaseStrapiDataCollection<IImage>
): ReactImageGalleryItem[] => {
  return images.data.map((image) => ({
    original: image.attributes.url,
  }));
};
