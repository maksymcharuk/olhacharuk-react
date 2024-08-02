import { createContext } from "react";
import { IHomePage } from "../../interfaces/home-page.interface";
import { IInfoPage } from "../../interfaces/info-page.interface";
import { IWorkPage } from "../../interfaces/work-page.interface";
import { IProject } from "../../interfaces/project.interface";

export interface IStore {
  homePage: IHomePage | null;
  workPage: IWorkPage | null;
  infoPage: IInfoPage | null;
  project: IProject | null;
}

export const STORE_DEFAULT_VALUE: IStore = {
  homePage: null,
  workPage: null,
  infoPage: null,
  project: null,
};

const StoreContext = createContext({
  store: STORE_DEFAULT_VALUE,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setStore: (_store: IStore) => {},
});

export default StoreContext;
