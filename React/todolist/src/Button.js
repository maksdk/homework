import React from 'react';
import './styles/button.css';

const renderIcon = classNameIcon => (
	<i
		className={classNameIcon}
		aria-hidden="true"
	/>
);

export default ({
	onclick,
	children, 
	className,
	classNameIcon, 
	style,
	//timeOfCreationTask, 
	index, 
	title,

}) =>
	{
			
		return(
			<button
				onClick={() => onclick()}
				className={ `button ${className}`}
				children={children ? children : renderIcon(classNameIcon)}
				title={title ? title : title}
				style={style}
				//data-time={timeOfCreationTask ? timeOfCreationTask : ''}
			/>
		);
	}	

