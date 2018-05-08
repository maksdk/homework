import {combineReducers} from 'redux';

import dueDate from './dueDate.js';
import lists from './lists.js';
import calendar from './calendar.js';
import dragTask from './dragTask.js';

export default combineReducers({
	dueDate,
	lists,
	calendar,
	dragTask
});