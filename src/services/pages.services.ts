import axios from "axios";
import { IBaseStrapiResponse } from "../interfaces/base-strapi-response.interface";
import { BASE_URL } from "../configs/constants";
import { IHomePage } from "../interfaces/home-page.interface";
import { IInfoPage } from "../interfaces/info-page.interface";
import { IWorkPage } from "../interfaces/work-page.interface";

export const getHomePage = async () => {
  const { data } = await axios.get<IBaseStrapiResponse<IHomePage>>(
    `${BASE_URL}/home-page?populate=deep`
  );
  return data.data;
};

export const getInfoPage = async () => {
  const { data } = await axios.get<IBaseStrapiResponse<IInfoPage>>(
    `${BASE_URL}/info-page?populate=deep`
  );
  return data.data;
};

export const getWorkPage = async () => {
  const { data } = await axios.get<IBaseStrapiResponse<IWorkPage>>(
    `${BASE_URL}/work-page?populate=deep`
  );
  return data.data;
};
