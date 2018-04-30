export default (state = [], action) => {
	if (action.type === 'FETCH__GALLERIES') {
		let { data } = action.payload;
		return [...data];
	} else if (action.type === 'LOADING__WITH__SCROLLING') {
		let { data } = action.payload;
		return [...state, ...data];
	}
	return [...state];
}