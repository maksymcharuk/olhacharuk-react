import axios from "axios";
import { IBaseStrapiResponse } from "../interfaces/base-strapi-response.interface";
import { BASE_URL } from "../configs/constants";

export const verifyPassword = async (password: string) => {
  const { data } = await axios.post<IBaseStrapiResponse<void>>(
    `${BASE_URL}/passwords/verify`, { password }
  );
  return data.data;
};
