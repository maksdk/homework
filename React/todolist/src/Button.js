import React from 'react';

export default ({children, className, onclick}) => (
	<button
		onClick={onclick}
		className={className}
	>
		{children}
	</button>
);