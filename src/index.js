import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

console.log("SUPERMAN",process.env.REACT_APP_DEV); 
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
