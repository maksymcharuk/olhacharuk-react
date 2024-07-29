import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Root from "./app/root";
import "./index.scss";
import { ThemeProvider } from "./app/providers/theme.provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
