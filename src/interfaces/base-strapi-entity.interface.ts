interface IBaseStrapiFields {
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

export interface IBaseStrapiEntity<T> {
  attributes: T & IBaseStrapiFields;
  id: string;
}
