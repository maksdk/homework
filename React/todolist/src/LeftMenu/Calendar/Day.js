import React from 'react';
import './styles/style.css';

export default ({number, date, isToday, isCurrentMonth, dayTitle}) => {
	let today = `${isToday ? 'today' : ''}`;
	let notCurrentMonth = `${isCurrentMonth ?  '' : 'notCurrentMonth'}`;
	let holiday = '';
	
	if (dayTitle === 'сб') {
		holiday = 'saturday';
	} else if (dayTitle === 'вс') {
		holiday = 'sunday';
	}
	
	return (
		<button 
			className={`calendar__week__day ${today} ${holiday} ${notCurrentMonth}`}
			children={number}
			data-time={date}
		/>

	);
}