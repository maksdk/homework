import { SAVE__DUE__DATE } from '../actions/actions.js';
export default (state = [], action) => {
	if (action.type === SAVE__DUE__DATE) {
		let dueDate = action.payload;
		let sameDate = state.find( date => date === dueDate);
		if (sameDate) return [...state];
		return [...state, dueDate];
	}
	return [...state];
}