import React from 'react';
import Button from '../Button.js';

export default ({selectPrevMonth, monthTitle, selectNextMonth}) => {
	return (
		<div className='calendar__nav'>
			<Button 
				classNameIcon="fa fa-chevron-left"
				className='calendar__nav__arrowLeft'
				onclick={selectPrevMonth}
				title='Предыдущий месяц'
			/>
			<span 
				className='calendar__nav__titleMonth'
				children={monthTitle}
			/>
			<Button
				classNameIcon="fa fa-chevron-right"
				className='calendar__nav__arrowRigth'
				onclick={selectNextMonth}
				title='Следующий месяц'
			/>
		</div>
	);
}