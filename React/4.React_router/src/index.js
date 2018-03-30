import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {
	createStore,
	applyMiddleware,
	combineReducers,
} from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import App from './App';


function users(state = [], action) {
	if (action.type === "Loading_user") {
		return [...state, action.payload];
	}
	return state;
}

const store = createStore(
	users,
  	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"),
);
