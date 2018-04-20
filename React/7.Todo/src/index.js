import React from 'react';
import ReactDom from 'react-dom';
//import Provider from 'react-redux';

import App from './App.js';

ReactDom.render(
	//<Provider>
		<App/>,
	//</Provider>,
	document.gerElementById('root')
);