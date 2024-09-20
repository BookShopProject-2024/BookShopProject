import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route, Routes } from 'react-router-dom';

import './css/index.css';
import App from './pages/index/App'
import Header from "./layout/Header";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <Header/>
        <App/>
  </BrowserRouter>
);

reportWebVitals(console.log);
