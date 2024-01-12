import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Root from "./app/root";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Root />
  </BrowserRouter>
  // </React.StrictMode>
);
