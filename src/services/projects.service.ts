import axios from "axios";
import { Project } from "../interfaces/project.interface";

const baseURL = "http://localhost:1337/api";

export const getProjects = async () => {
  const { data } = await axios.get<Project[]>(`${baseURL}/projects`);
  return data;
};
