import React from 'react';

export default ({
	color,
	title
}) =>  {
	return(
		<span
			title={title}
			className='task__body--colorList'
			style={{
				backgroundColor: color
			}}
		/>
	);
}
	


