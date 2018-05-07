import React from 'react';

export default ({
	content, 
	dragEnter, 
	className
}) => (
	<span 
		className={`listTasks__task--text ${className ? 'doneTaskText' : ''}`}
		onDragEnter={dragEnter}
		children={content}
	/>
);