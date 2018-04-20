import React from 'react';

export default ({className, dragStart, dragEnd, drag, dragEnter}) => {
	return (
		<span
			className={className}
			draggable='true'	
			onDragStart={dragStart}
			onDragEnd={dragEnd}	
			onDrag={drag}
			onDragEnter={dragEnter}					
		>
			:::
		</span>
		);
}
