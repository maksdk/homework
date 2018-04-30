import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import TodoList from './TodoList.js';
import reducers from './reducers/index.js';
import './styles/index.css';

const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let todolist = document.getElementById('todolist');
ReactDOM.render(
  <Provider store={store}>
    <TodoList todolist={todolist} />
  </Provider>,
 	todolist
);