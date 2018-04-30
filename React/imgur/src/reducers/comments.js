export default (state = [], action) => {
	if (action.type === 'FETCH__COMMENTS') {
		return [...action.payload.data];
	}
	return [...state];
}