import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Loader from './components/Loader.js';
import Checkbox from './components/Checkbox.js';
import Button from './components/Button.js';

import {
	selectTime,
	selectClearAllDay,
	clearAllWeek,
	asyncGetData
} from "./actions/actions.js";

import "./styles/main.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: true,
			saveChange: null
		};
		this.firstSelectedTime = null;
		this.selectedStartHour = null;
		this.selectedEndHour = null;
		this.selectedDay = null;
		this.onMouseDownTime = this.onMouseDownTime.bind(this);
		this.onMouseUpTime = this.onMouseUpTime.bind(this);
		this.onMouseOverTime = this.onMouseOverTime.bind(this);
		this.saveChange = this.saveChange.bind(this);
		this.setDefaultChecked = this.setDefaultChecked.bind(this);
		this.clearWeek = this.clearWeek.bind(this);
		this.resetState = this.resetState.bind(this);
	}
	componentDidMount() {
		window.addEventListener("mouseup",this.onMouseUpTime,false);
		let { asyncGetData } = this.props;
		asyncGetData();
	}
	componentWillUnmount() {
		window.removeEventListener("mouseup",this.onMouseUpTime);
	}
	resetState() {
		this.selectedDay = null;
		this.selectedStartHour = null;
		this.firstSelectedTime = null;
		this.selectedEndHour = null;
		this.setState({
			hover: true
		});
	}
	clearWeek() {
		let { clearAllWeek } = this.props;
		Object.keys(this.refs).map(key => {
			this.refs[key].checked = false;
		});
		clearAllWeek();
	}
	setDefaultChecked(selectedTime) {
		if (
			JSON.stringify(selectedTime) ===
			JSON.stringify([{ bt: 0, et: 1439 }])
		) {
			return true;
		}
		return false;
	}
	saveChange() {
		this.setState({
			saveChange: true
		});
	}
	onMouseUpTime() {
		this.resetState();
	}
	onMouseDownTime(day, start, end) {
		let { selectTime } = this.props;
		this.firstSelectedTime = start;
		this.selectedDay = day;
		this.selectedStartHour = Math.min(start, end);
		this.selectedEndHour = Math.max(start, end);

		this.setState({
			hover: null
		});

		selectTime(
			this.selectedDay,
			this.selectedStartHour,
			this.selectedEndHour
		);
	}
	onMouseOverTime(day, start, end) {
		if (this.selectedDay !== day) return;
		if (start === this.selectedStartHour) return;
		if (Math.abs(this.selectedStartHour - start) > 60) {
			this.resetState();
			return;
		}

		let { selectTime } = this.props;
		if ((start > this.selectedStartHour && start > this.firstSelectedTime) ||
			(start < this.selectedStartHour && start < this.firstSelectedTime)) {
			this.selectedStartHour = Math.min(start, end);
			this.selectedEndHour = Math.max(start, end);
			selectTime(
				day,
				this.selectedStartHour,
				this.selectedEndHour
			);
		} else {
			selectTime(
				day,
				this.selectedStartHour,
				this.selectedEndHour
			);
			this.selectedStartHour = Math.min(start, end);
			this.selectedEndHour = Math.max(start, end);
		}
	}
	checkSelectedTime(start, selectedTime) {
		let selected;
		for (let key of selectedTime) {
			let { bt, et } = key;
			if (bt <= start && start < et) {
				selected = true;
				break;
			}
		}
		return selected;
	}
	renderHour(key, selectedTime) {
		let { hover } = this.state;
		let day = [];
		for (let i = 0; i < 24; i++) {
			let start = i * 60;
			let end = start + 59;
			let isSelectedTime = this.checkSelectedTime(start, selectedTime);
			day.push(
				<div
					key={i}
					onMouseDown={() =>this.onMouseDownTime(key, start, end)}
					onMouseOver={() =>this.onMouseOverTime(key, start, end)}
					className={`calendar__row__day--hour 
						${hover ? "onHoverOur" : ""} 
						${isSelectedTime ? "selectedTime" : ""}`
					}
				/>
			);
		}
		return day;
	}
	renderHeaderTime() {
		let time = [];
		for (let i = 0; i < 24; i++) {
			if (i % 3) continue;
			time.push(
				<div
					key={i}
					children={`${i} : 00`}
					className="calendar__header__time"
				/>
			);
		}
		return time;
	}
	render() {
		let {
			schedule,
			selectClearAllDay,
			asyncGetData
		} = this.props;
		let { saveChange } = this.state;
		return (
		 	<Fragment>
		 		{ Object.keys(schedule).length === 0
					? <Loader/> 
					: <div className="calendar">
						<div className="calendar__header">
							<div
								className="calendar__header__allDay"
								children="All DAY"
							/>
							{this.renderHeaderTime()}
						</div>
						{Object.keys(schedule).map((key, i) => (
							<div
								className="calendar__row"
								key={key}
							>
								<div
									children={key}
									className={`calendar__row__nameDay 
										${schedule[key].length ? "selectedTime" : ""}`
									}
								/>
								<div className="calendar__row__checkbox">
									<Checkbox
										ref={"checkbox_" + i}
										index={ i}
										onChange={() => selectClearAllDay(key)}
										checked={this.setDefaultChecked(schedule[key])}
									/>
								</div>
								<div className="calendar__row__day">
									{this.renderHour(key, schedule[key])}
								</div>
							</div>
						))}
						<div className="calendar__buttons">
							<Button
								onClick={this.clearWeek}
								children="Clear"
								className="calendar__buttons--clearWeek"
							/>
							<Button
								children="Save Change"
								onClick={this.saveChange}
							/>	
						</div>
						{saveChange && (
							<div
								className="calendar__pre"
								children={JSON.stringify(schedule,0,2)}
							/>
						)}
					</div>
				}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	schedule: state.schedule
});

const mapDispatchToProps = dispatch => ({
	selectTime: (dayName, newStart, newEnd) => {
		dispatch(selectTime(dayName, newStart, newEnd));
	},
	selectClearAllDay: dayName => {
		dispatch(selectClearAllDay(dayName));
	},
	clearAllWeek: () => {
		dispatch(clearAllWeek());
	},
	asyncGetData: () => {
		dispatch(asyncGetData());
	}
});

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(App);
