import React from 'react';
import Button from '../../Button.js'

import './styles/style.css';

export default ({selectPrevMonth, monthTitle, selectNextMonth}) => {
	return (
		<div className='calendar__nav'>
			<Button 
				className='calendar__nav__arrowLeft'
				onclick={selectPrevMonth}
			/>
			<span 
				className='calendar__nav__titleMonth'
				children={monthTitle}
			/>
			<Button
				className='calendar__nav__arrowRigth'
				onclick={selectNextMonth}
			/>
		</div>
	);
}