import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/header.component";
import { useContext, useState } from "react";
import StoreContext, {
  IStore,
  STORE_DEFAULT_VALUE,
} from "./contexts/store.context";
import AuthContext from "./contexts/auth.context";

export default function App() {
  const [store, setStore] = useState<IStore>(STORE_DEFAULT_VALUE);
  const { isVerified } = useContext(AuthContext);

  if (!isVerified) {
    return <Navigate to="/password" />;
  }

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <Header />
      <main className="main container">
        <Outlet />
      </main>
    </StoreContext.Provider>
  );
}
