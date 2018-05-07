import { FIND__TASK__BY__DATE } from '../actions/actions.js';

export default (state = [], action) => {
	if (action.type === FIND__TASK__BY__DATE) {
		let { list, date } = action.payload;
		let tasks = list.tasks.filter( ({dueDate}) => dueDate === date);
		return {tasks: tasks, downshift: [...list.downshift]};
	}
	return [...state];
}