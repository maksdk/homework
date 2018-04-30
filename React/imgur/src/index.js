import React, {} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Gallery from './components/Gallery/Gallery.js';
import HomePage from './components/HomePage/HomePage.js';

import reducers from './reducers/index.js';
import './index.css';

let store = createStore(
	reducers, 
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider  store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={Gallery} />
				<Route path="/gallery/:postId" component={HomePage} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);



