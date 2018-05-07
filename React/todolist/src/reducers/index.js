import {combineReducers} from 'redux';

import dueDate from './dueDate.js';
import lists from './lists.js';
import calendar from './calendar.js';

export default combineReducers({
	dueDate,
	lists,
	calendar
});