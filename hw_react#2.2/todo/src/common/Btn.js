import React from 'react';

const Btn = ({children, className, handler}) => {
	return(
		<button
			className={className}
			onClick={handler}
		>
			{children}
		</button>
	);
}

export default Btn;