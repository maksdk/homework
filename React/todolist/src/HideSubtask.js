import React from 'react';
import Button from './Button.js';

export default ({parent, index, lastTask}) => {
	//console.log(parent);
	//console.log(index);
	//console.log(lastTask);

	return (
		<span className='listTasks_turn'>
			<span className={`verticalLineUp ${ index === 0 ? 'hide' : '' }`}></span>
			<span className="horizontalLineRight"></span>
			<span className={`verticalLineDown ${ lastTask || parent ? 'hide' : '' }`}></span>
			{ //parent &&
				// <Button 
				// 		className='listTasks__btn--turnOff'
				// 		children='-'
				// 	/>
			}
		</span>	
	);
}