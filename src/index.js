import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./contexts/ThemeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<<<<<<< HEAD

    <ThemeProvider>
      <App />
    </ThemeProvider>
=======
  
    <ThemeProvider>
      <App />
    </ThemeProvider>

>>>>>>> 3c9c1cfa7212cf6656268e3f616210290e8b67da
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
