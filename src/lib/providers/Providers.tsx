"use client";

import { persistor, store } from "@/redux/store";
import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { theme } from "../theme/theme";
import CssBaseline from "@mui/material";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
