import { GET__VALUE__ALL__TASKS } from '../actions/actions.js';

export default (state = [], action) => {
	if (action.type === GET__VALUE__ALL__TASKS) {
		let { activeList, allLists } = action.payload;
		return [...state];
	}
	return [...state];
}