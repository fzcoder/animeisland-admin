import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routers';
import axiosInstance from "./api";
import './index.css';

React['$http'] = axiosInstance;

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

