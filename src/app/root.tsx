import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ReactGA from "react-ga";
import HomePage from "./pages/home.page";
import WorksPage from "./pages/works.page";
import InfoPage from "./pages/info.page";
import PasswordPage from "./pages/password.page";
import ErrorPage from "./pages/error.page";
import AuthProvider from "./providers/auth.provider";
import Protected from "./protected";
import App from "./app";

import { GA_TRACKING_ID } from "../configs/constants";
import { useEffect } from "react";

ReactGA.initialize(GA_TRACKING_ID);

export default function Root() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <AuthProvider>
      <AnimatePresence>
        <Routes>
          <Route element={<App />}>
            <Route element={<Protected />}>
              <Route path="work" element={<WorksPage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="info" element={<InfoPage />} />
            <Route path="password" element={<PasswordPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}
