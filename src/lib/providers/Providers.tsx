"use client";

import { Button, ThemeProvider } from "@mui/material";
import { ReactNode, useState } from "react";
import { theme } from "../theme/theme";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
