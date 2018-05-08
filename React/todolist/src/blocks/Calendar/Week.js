import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import Day from './Day.js';

export default ({weekDate, month, ...rest}) => {
	const day = () => {
		const arrDays = [];
		const today = moment().format('DD.MM.YYYY');

		for (let i = 0; i < 7; i++) {
			const currentDay = weekDate.format('DD.MM.YYYY');
			arrDays.push(
				<Day 
					key={currentDay} 
					number={weekDate.date()}
					date={currentDay}
					isToday={today === currentDay}
					isCurrentMonth={month.month() === weekDate.month()}
					dayTitle={weekDate.format('dd')}
					{...rest}
				/>
			);
			weekDate.add(1, 'day')
		}
		return arrDays;
	}
	return (
		<div className='calendar__week' >
			{day()}
		</div>
	);
}