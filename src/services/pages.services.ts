import axios from "axios";
import { IBaseStrapiResponse } from "../interfaces/base-strapi-response.interface";
import { baseURL } from "../configs/constants";
import { IHomePage } from "../interfaces/home-page.interface";
import { IInfoPage } from "../interfaces/info-page.interface";
import { IWorkPage } from "../interfaces/work-page.interface";

export const getHomePage = async () => {
  const { data } = await axios.get<IBaseStrapiResponse<IHomePage>>(
    `${baseURL}/home-page?populate=deep`
  );
  return data.data;
};

export const getInfoPage = async () => {
  const { data } = await axios.get<IBaseStrapiResponse<IInfoPage>>(
    `${baseURL}/info-page?populate=deep`
  );
  return data.data;
};

export const getWorkPage = async () => {
  const { data } = await axios.get<IBaseStrapiResponse<IWorkPage>>(
    `${baseURL}/work-page?populate=deep`
  );
  return data.data;
};
