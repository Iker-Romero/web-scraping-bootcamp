import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import { ThemeProvider } from "styled-components";
import Home from "./routes/Home";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { GlobalStyle, theme } from "./styles/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
