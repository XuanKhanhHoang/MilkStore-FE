"use client";
import { Provider } from "react-redux";

import React, { ReactNode } from "react";
import { store } from "./store";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
