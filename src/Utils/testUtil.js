import React from "react";
import { render as RTL } from "@testing-library/react";
import {
  ColorModeProvider,
  CSSReset,
  ThemeProvider,
  theme,
} from "@chakra-ui/core";
import { Router } from "react-router-dom";
import { ReactQueryCacheProvider, QueryCache } from "react-query";
import { createMemoryHistory } from "history";

const AllTheProviders = ({ children }) => {
  const queryCache = new QueryCache();
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <ReactQueryCacheProvider queryCache={queryCache}>
          {children}
        </ReactQueryCacheProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

const AllTheProvidersWithRouter = ({ children }) => {
  const queryCache = new QueryCache();
  const history = createMemoryHistory();
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Router history={history}>
          <ReactQueryCacheProvider queryCache={queryCache}>
            {children}
          </ReactQueryCacheProvider>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

const render = (ui, options) =>
  RTL(ui, { wrapper: AllTheProviders, ...options });

const renderWithRouter = (ui, options) =>
  RTL(ui, { wrapper: AllTheProvidersWithRouter, ...options });

// re-export everything
export * from "@testing-library/react";

// const render = (component, option = {}) => {
//   const queryCache = new QueryCache();
//   return RTL(
//     <ThemeProvider theme={theme}>
//       <ColorModeProvider>
//         <CSSReset />
//         <ReactQueryCacheProvider queryCache={queryCache}>
//           {component}
//         </ReactQueryCacheProvider>
//       </ColorModeProvider>
//     </ThemeProvider>,
//     option
//   );
// };

// const renderWithRouter = (component, option = {}) => {
//   const queryCache = new QueryCache();
//   const history = createMemoryHistory();
//   return RTL(
//     <ThemeProvider theme={theme}>
//       <ColorModeProvider>
//         <CSSReset />
//         <Router history={history}>
//           <ReactQueryCacheProvider queryCache={queryCache}>
//             {component}
//           </ReactQueryCacheProvider>
//         </Router>
//       </ColorModeProvider>
//     </ThemeProvider>,
//     option
//   );
// };

// const renderWithRouter = (component, {
//   route = '/',
//   history = createMemoryHistory({ initialEntries: [route] }),
// } = {}) => {
//   return {
//     ...render(<Router history={history}>{component}</Router>),
//     history
//   }
// }

export { render, renderWithRouter };
