import React from 'react';

export default ({
	text, 
	dragEnter, 
	className = ''
}) => (
	<span 
		className={`task__body--text ${className}`}
		onDragEnter={dragEnter}
		children={text}
	/>
);