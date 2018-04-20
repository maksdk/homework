import React from 'react';

export default ({className, content, dragEnter}) => (
	<span 
		className={className}
		onDragEnter={dragEnter}
	>
		{content}
	</span>
);