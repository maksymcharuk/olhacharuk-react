import { Route, Routes } from "react-router-dom";
import App from "./app";
import HomePage from "./pages/home.page";
import WorksPage from "./pages/works.page";
import InfoPage from "./pages/info.page";
import PasswordPage from "./pages/password.page";
import ErrorPage from "../error.page";
import AuthProvider from "./providers/auth.provider";

export default function Root() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="work" element={<WorksPage />} />
          <Route path="info" element={<InfoPage />} />
        </Route>
        <Route path="password" element={<PasswordPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
}
