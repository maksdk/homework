import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import App from './App.js';
import reducers from './reducers/index.js';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

const store = createStore(
	reducers, 
	composeWithDevTools(applyMiddleware(thunk))
);

let todolist = document.getElementById('todolist');
ReactDOM.render(
  <Provider store={store}>
    <App todolist={todolist} />
  </Provider>,
 	todolist
);