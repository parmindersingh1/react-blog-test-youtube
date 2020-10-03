import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryCacheProvider } from "react-query";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { queryCache } from "./reactQuery";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Router>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <App />
          </ReactQueryCacheProvider>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
