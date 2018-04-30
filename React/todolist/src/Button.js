import React from 'react';

export default ({children, className, onclick, index}) => (
	<button
		onClick={() => onclick(index)}
		className={className}
		children={children}
	/>
);