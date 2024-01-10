import { Outlet } from "react-router-dom";
import Header from "./components/header.component";
import { createContext, useState } from "react";
import { IHomePage } from "../interfaces/home-page.interface";
import { IWorkPage } from "../interfaces/work-page.interface";
import { IInfoPage } from "../interfaces/info-page.interface";

interface IStore {
  homePage: IHomePage | null;
  workPage: IWorkPage | null;
  infoPage: IInfoPage | null;
}

const defaultValue: IStore = {
  homePage: null,
  workPage: null,
  infoPage: null,
};

export const StoreContext = createContext({
  store: defaultValue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setStore: (_store: IStore) => {},
});

export default function Root() {
  const [store, setStore] = useState<IStore>(defaultValue);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <Header />
      <main className="main container">
        <Outlet />
      </main>
    </StoreContext.Provider>
  );
}
