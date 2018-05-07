import React from 'react';
export default ({
	className,
	onclick,
	index,
	toggle
}) => (
	<span 
		className={`dropdown ${className}`}
		onClick={onclick}
	>
		<i className='fa fa-chevron-down' aria-hidden="true"></i>
	</span>
);