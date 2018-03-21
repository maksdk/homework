import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './index.css';
import Todo from './Todo.js';



function add (state = [], action) {
  console.log("state reducer");
  console.log(state);
 return state;
}

//сюда передаем все редьюсеры
const store = createStore(
	add,
  	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


// store.dispatch({
//   type:"Add task",
//   payload: "HERE"
// });

ReactDOM.render(
	<Provider store={store}>
		<Todo />
	</Provider>, 
	document.getElementById('root')
);
