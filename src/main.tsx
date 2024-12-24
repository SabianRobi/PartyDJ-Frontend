import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./layout/routing/AuthProvider";
import "./main.css";
import { store } from "./redux/store";
import { router } from "./routing/routes";

const root = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
