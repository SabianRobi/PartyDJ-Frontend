import { Flowbite } from "flowbite-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { customTheme } from "./layout/flowbiteTheme";
import AuthProvider from "./layout/routing/AuthProvider";
import "./main.css";
import { store } from "./redux/store";
import { router } from "./routing/routes";

const root = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Flowbite theme={{ theme: customTheme }}>
          <RouterProvider router={router} />
        </Flowbite>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
