import React from 'react';

export default ({
	number, 
	date, 
	isToday, 
	isCurrentMonth, 
	dayTitle, 
	selectDay,
	activeDate,
	dueDate = []
}) => {
	let isDueDate = dueDate.find( dueDate => dueDate === date);
	let today = `${isToday ? 'today' : ''}`;
	let notCurrentMonth = `${isCurrentMonth ?  '' : 'notCurrentMonth'}`;
	let holiday = '';
	let active = activeDate === date ? 'activeDate' : '';
	
	if (dayTitle === 'сб') {
		holiday = 'saturday';
	} else if (dayTitle === 'вс') {
		holiday = 'sunday';
	}
	
	return (
		<button 
			className={`calendar__week__day ${today} ${holiday} ${notCurrentMonth} ${active}`}
			data-time={date}
			title={`${date}${isToday ? ' - Сегодня' : ''}`}
			onClick={() => selectDay(date)}
		>
			{number}
			{isDueDate &&
				<span className='calendar__week__day--markerCircle' />
			}
		</button>

	);
}