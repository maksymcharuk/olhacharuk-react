type MimeType = "image/jpeg" | "image/gif";
type ResourceType = "image" | "raw" | "video" | "auto";

interface IFormat {
  ext: ".jpg";
  hash: string;
  height: number;
  mime: MimeType;
  name: string;
  path: string | null;
  provider_metadata: { public_id: string; resource_type: ResourceType };
  size: number;
  url: string;
  width: number;
}

export interface IImage {
  alternativeText: string;
  caption: string;
  createdAt: string;
  ext: string;
  formats: {
    large: IFormat;
    medium: IFormat;
    small: IFormat;
    thumbnail: IFormat;
  };
  hash: string;
  height: number;
  mime: MimeType;
  name: string;
  previewUrl: string | null;
  provider: "cloudinary";
  provider_metadata: { public_id: string; resource_type: ResourceType };
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}
