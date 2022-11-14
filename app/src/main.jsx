import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import GlobalStyle from "styled-components";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <Root />
  </React.StrictMode>
);
