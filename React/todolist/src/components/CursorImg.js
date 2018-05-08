import React from 'react';

import Drag from './CenterContent/DragTask.js';
import Button from './Button.js';

export default ({task, style, className}) => (
	<div 
		className={`task ${className}`}
		style={style}	
	>
		<Drag 
			className='listTasks__task--drag'
		/>
		<span 
			className='listTasks__task--text'
			children={task}
		/>
		<Button 
			className='listTasks__task--delete'
			children='x'
		/>
		<Button 
			className='listTasks__task--menu'
			children='...'
		/>
	</div>	
)
	