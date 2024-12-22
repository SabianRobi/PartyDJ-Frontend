import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";
import Auth from "./pages/auth/Auth";
import { store } from "./redux/store";
import { router } from "./routing/routes";

const root = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </Provider>
  </StrictMode>
);
