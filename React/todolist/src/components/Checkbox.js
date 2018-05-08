import React from 'react';

export default ({
	index, 
	onclick, 
	className,
	hover,
	onMouseEnter,
	onMouseLeave,
	click,
	checked,
	onDragEnter
}) => (
	<span
		className={`todolist__checkbox ${className}`}
		onDragEnter={onDragEnter}
	> 
		<i 
			className='fa fa-square-o'
			aria-hidden="true"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onclick}
		/>
		{ hover &&  !checked &&
			<span className={`todolist__checkbox--hover ${className}--hover`}>
				<i className="fa fa-check" aria-hidden="true"></i>
			</span>
		}
		{ checked &&
			<span className={`todolist__checkbox--hover ${className}--checked`}>
				<i className="fa fa-check" aria-hidden="true"></i>
			</span>
		}		
	</span>
);
