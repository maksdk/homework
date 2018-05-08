import React from 'react';

export default ({
	className, 
	dragStart, 
	dragEnd, 
	drag, 
	dragEnter,
	onMouseDown
}) => (
	<span
		className={className}
		draggable='true'
		onDragStart={dragStart}
		onDragEnd={dragEnd}	
		onDrag={drag}
		onDragEnter={dragEnter}	
		onMouseDown={onMouseDown}				
	> 
		<i className="fa fa-bars" aria-hidden="true"></i>
	</span>
);
