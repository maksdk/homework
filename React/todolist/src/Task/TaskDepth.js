import React from 'react';

export default ({
	depth, 
	onDragEnter,
	className = ''
}) => (
	<span 
		className={ `task__wrapper__depth ${className}`}
		onDragEnter={onDragEnter}
	/>
);
