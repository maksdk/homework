export default (state = [], action) => {
	if (action.type === "Dragenter__subtask") {
		return [...state, action.payload];
	} 
	
	return state;
}