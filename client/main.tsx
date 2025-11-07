import { createRoot } from "react-dom/client";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error('Root container missing');

const __win = window as any;
if (!__win.__APP_ROOT__) {
  __win.__APP_ROOT__ = ReactDOMClient.createRoot(container);
}
__win.__APP_ROOT__.render(<App />);
