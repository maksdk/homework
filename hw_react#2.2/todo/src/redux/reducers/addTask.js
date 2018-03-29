export default function addTask (state = [], action) {
  if (action.type === 'Add_task') {
  	return [...state, action.payload];
  } else if (action.type === 'Delete_task') {
  	console.log("====DELETE TASK====");
  }
  return state;
}