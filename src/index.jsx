import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './appEntry.scss';
import App from './App.jsx';
import 'bootstrap';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));


const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    app
);
