import React from 'react';
import { Link } from 'react-router-dom';
import ToTopPage from '../helpers/toTopPage.js';

import './styles/backToMainPage.css';

export default ({onclick}) => (
	<Link  
		className="btnBackToMainPage" 
		title='Back to main page' 
		to="/"
		onClick={ToTopPage}
	/>
);
