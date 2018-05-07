import React from 'react';

export default ({
	index, 
	onClickDoneTask, 
	doneTask
}) => {
	return (
		<span
			className={`listTasks__task--checkbox ${doneTask ? 'doneTaskCheckbox' : ''}`}
			onClick={() => onClickDoneTask(index)}
		/>
	);
}