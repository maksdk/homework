import React from 'react';
import './styles/main.css';

export default ({
	className,
	children, 
	onclick = null, 
	//styleChildren = '',
	classNameIcon = ''
}) => (
	<span className={className}>
		<span
			title='Удалить тег'
			className={`${className}--icon`}
			children={
				<i className={classNameIcon} aria-hidden="true"></i>
			}
			onClick={onclick}
		/>
		<span
			//style={styleChildren}
			children={children}
		/>
			
	</span>
);