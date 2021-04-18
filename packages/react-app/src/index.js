import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Web3 from "web3";
import { Web3ReactProvider } from '@web3-react/core';
import NotificationProvider from "./components/notifications/provider/Provider.component";

function getLibrary(provider) {
   const library = new Web3(provider);
   library.pollingInterval = 10000
   return library
};


ReactDOM.render(
   <Web3ReactProvider getLibrary={getLibrary}>
      <NotificationProvider>
         <App />
      </NotificationProvider>
   </Web3ReactProvider>,
   document.getElementById("root"),
);