import { Outlet } from "react-router-dom";
import Header from "./components/header.component";
import { useState } from "react";
import StoreContext, {
  IStore,
  STORE_DEFAULT_VALUE,
} from "./contexts/store.context";

export default function Root() {
  const [store, setStore] = useState<IStore>(STORE_DEFAULT_VALUE);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <Header />
      <main className="main container">
        <Outlet />
      </main>
    </StoreContext.Provider>
  );
}
