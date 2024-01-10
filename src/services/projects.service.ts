import axios from "axios";
import { IProject } from "../interfaces/project.interface";
import { IBaseStrapiCollectionResponse } from "../interfaces/base-strapi-response.interface";
import { baseURL } from "../configs/constants";

export const getProjects = async () => {
  const { data } = await axios.get<IBaseStrapiCollectionResponse<IProject>>(
    `${baseURL}/projects?populate=deep`
  );
  return data.data;
};
