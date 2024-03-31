import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import AlertComponent from "./components/AlertComponent/AlertComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Provider store={store}>
        <AlertComponent />
        <App />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
