import React, {Component} from 'react';
//import {connect} from 'redux';

import LeftSide from './LeftSide.js';
import MainContent from './MainContent.js';

export default (props) => {
	return [
		<LeftSide/>
		<MainContent/>
	];
}
	


