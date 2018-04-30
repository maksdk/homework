import React from 'react';
import { Link } from "react-router-dom";

import './styles/togglePost.css';

export default ({ 
	className, 
	id, 
	onClickNextOrPrevButton 
}) => (
	<Link
		className={`homePage__header--${className}Post`}
		children={`${className === 'next' ? 'Next Post' : ''}`}
		title={`${className === 'next' ? 'Next post' : 'Previous post'}`}
		onClick={() => onClickNextOrPrevButton(className)}
		to={`${id}`}
	/>
);