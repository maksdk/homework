import React from 'react';
import {clone, add, format, startOf} from 'moment';
import 'moment/locale/ru'

import './styles/style.css';

import CalendarNav from './CalendarNav.js';
import Week from './Week.js';
import DaysTitle from './DaysTitle.js';

export default ({ month, ...rest }) => {
	const week = () => {
		let arrWeeks = [];
		let nextMonth = month.clone().add(1, 'M').format('MM');
		let weekDate = month.clone().startOf("month").startOf('w');
		
		while (true) {
			let currentMonth = weekDate.format('MM');
			if (nextMonth === currentMonth) break;
			arrWeeks.push(
				<Week
					key={weekDate.format('DD.MM.YYYY')}
					weekDate={weekDate.clone()}
					month={month}
				/>
			)
			weekDate.add(1, 'w');
		}
		return arrWeeks;
	}
	return (
		<div className='calendar'>
			<CalendarNav 
				monthTitle={month.format('MMMM YYYY')} 
				{...rest} 
			/>
			<DaysTitle/>
			{week()}
		</div>
	);
}