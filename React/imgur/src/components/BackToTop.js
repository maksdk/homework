import React from 'react';
import './styles/backToTop.css';

export default ({onclick}) => (
	<button 
		className='btnBackToTop'
		onClick={onclick}
		title='Back to top'
	/>
);