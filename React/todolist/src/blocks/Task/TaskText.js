import React from 'react';

export default ({
	text, 
	dragEnter, 
	className = ''
}) => (
	<span 
		className={`task__body--text `}
		onDragEnter={dragEnter}
	> 
		<span className ={`${className}`}>{text}</span>
	</span>
);