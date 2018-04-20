import {combineReducers} from 'redux';

import task from './task.js';
import drag from './drag.js';
export default combineReducers({
	task,
	drag
});