import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './styles/index.css';
import Todo from './Todo.js';
import reducers from './redux/reducers/';

const store = createStore(
	reducers,
  	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
		<Todo />
	</Provider>, 
	document.getElementById('root')
);
