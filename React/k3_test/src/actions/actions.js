import axios from 'axios';
export const SET__NEW__TIME = 'SET__NEW__TIME';
export const CHECK__ALL__DAY = 'CHECK__ALL__DAY';
export const CLEAR__ALL__WEEK = 'CLEAR__ALL__WEEK';
export const FETCH__DATA__REQUEST = "FETCH__DATA__REQUEST";

export const selectTime = (dayName, newStart, newEnd) => dispatch => (
	dispatch({
		type: SET__NEW__TIME,
		payload: {
			dayName,
			newStart,
			newEnd
		}
	})
);
export const selectClearAllDay = dayName => dispatch => (
	dispatch({
		type: CHECK__ALL__DAY,
		payload: dayName
	})
);
export const clearAllWeek = () => dispatch => (
	dispatch({
		type: CLEAR__ALL__WEEK
	})
);
export const asyncGetData = () => dispatch => (
	axios('/api/data')
		.then( res => {
			dispatch({
				type:FETCH__DATA__REQUEST,
				payload: res.data
			})
		})
);


