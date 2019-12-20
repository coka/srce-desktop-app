import React from 'react';
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import './appEntry.scss';
import App from './App.jsx';
import 'bootstrap';

const app = document.getElementById('app');
ReactDOM.render(<HashRouter><App/></HashRouter>, app);
