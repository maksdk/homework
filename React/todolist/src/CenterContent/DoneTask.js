import React from 'react';

export default ({index, onClickDoneTask, done}) => {
	return (
		<span
			className={`doneTask ${done ? 'doneTaskAnimation' : ''}`}
			onClick={() => onClickDoneTask(index)}
		/>
	);
}