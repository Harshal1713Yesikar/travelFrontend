import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "./contexts/ThemeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-my6jyjo2dlj0h7p4.us.auth0.com"
    clientId="gTRtDV0KAR8S5IZ0spBiwzLvXweFWroS"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
