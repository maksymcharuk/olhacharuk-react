import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header.component";
import ThemeToggle from "./components/theme-toggle.component";
import StoreContext, {
  IStore,
  STORE_DEFAULT_VALUE,
} from "./contexts/store.context";

export default function App() {
  const [store, setStore] = useState<IStore>(STORE_DEFAULT_VALUE);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <Header />
      <main className="main container">
        <Outlet />
        <ThemeToggle />
      </main>
    </StoreContext.Provider>
  );
}
