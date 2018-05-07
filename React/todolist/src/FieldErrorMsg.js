import React from 'react';

export default ({message, className}) => (
	<span 
		className={`${className}__inputData--msgError`}
		children={message}
	/>
);