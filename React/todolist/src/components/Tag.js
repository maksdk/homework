import React from 'react';
import './styles/tag.css';

export default ({
	className,
	children, 
	onclick = null, 
	style,
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
			style={style}
		/>
		<span
			style={style}
			children={children}
		/>
			
	</span>
);