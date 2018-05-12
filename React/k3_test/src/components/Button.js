import React from 'react';
import './styles/button.css';

export default ({
	onClick, 
	children,
	className = ''
}) => (
	<button
		className={ `button ${className}`}
		children={children}
		onClick={onClick}
	/>
);

