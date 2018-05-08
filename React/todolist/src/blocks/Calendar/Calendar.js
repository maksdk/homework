import React, { Component } from 'react';
import {clone, add, format, startOf} from 'moment';
import 'moment/locale/ru'

import CalendarNav from './CalendarNav.js';
import Week from './Week.js';
import DaysTitle from './DaysTitle.js';
import './_calendar.css';

export default class Calendar extends Component {
	constructor(props){
		super(props);
		this.state={
			month:  this.props.month
		}

		this.renderWeek = this.renderWeek.bind(this);
		this.selectPrevMonth = this.selectPrevMonth.bind(this);
		this.selectNextMonth = this.selectNextMonth.bind(this);
	}
	selectPrevMonth () {
		let { month } = this.state;
		this.setState({
			month: month.subtract(1, 'months')
		})
	}
	selectNextMonth () {
		let { month } = this.state;
		this.setState({
			month: month.add(1, 'months')
		})
	}
	renderWeek(month, selectDay, activeDate, dueDate) {
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
					selectDay={selectDay}
					activeDate={activeDate}
					dueDate={dueDate}
				/>
			)
			weekDate.add(1, 'w');
		}
		return arrWeeks;
	}
	render() {
		let {
			month, 
			selectDay,
			activeDate, 
			className,
			dueDate
		} = this.props;
		return(
			<div className={`calendar ${className ? className : ''}`}>
				<CalendarNav 
					monthTitle={month.format('MMMM YYYY')} 
					selectPrevMonth={this.selectPrevMonth} 
					selectNextMonth={this.selectNextMonth}
				/>
				<DaysTitle/>
				{this.renderWeek(month, selectDay, activeDate, dueDate)}
			</div>
		);
	}
}

