import moment from 'moment';

export const ADD__TASK = 'ADD__TASK';
export const DELETE__TASK = 'DELETE__TASK';
export const DONE__TASK = 'DONE__TASK';
export const DROP__DOWN__SUBTASK = "DROP__DOWN__SUBTASK";
export const ADD__NEW__LIST__IN__STORE = 'ADD__NEW__LIST__IN__STORE';

export const DRAG__START__TASK = 'DRAG__START__TASK';
export const DRAG__ENTER__TASK = 'DRAG__ENTER__TASK';
export const DRAG__ENTER__TASK__RIGHT = 'DRAG__ENTER__TASK__RIGHT';
export const DRAG__ENTER__TASK__LEFT = 'DRAG__ENTER__TASK__LEFT';
export const DRAG__END__TASK = 'DRAG__END__TASK';

export const SAVE__DUE__DATE = 'SAVE__DUE__DATE';
export const GET__VALUE__ALL__TASKS = 'GET__VALUE__ALL__TASKS';
export const FIND__TASK__BY__DATE = 'FIND__TASK__BY__DATE';

export const addTask = (
	text,
	dueDate = 'Без срока', 
	list = 'Входящие',
	priority = {color:'grey', child: '!'},
	colorList
) => dispatch =>{
	dispatch({
		type: ADD__TASK,
		payload:{
			list: list,
			downshift: text,
			tasks: [{
				depth:[],
				list: list,
				dueDate: dueDate,
				text: text,
				priority: priority,
				creationTime: moment().format('DD.MM.YYYY HH:mm:ss'),
				id: moment().format('x'),
				children: 0,
				draggingOpacity: '',
				hiddenSubtasks: [],
				colorList: colorList
			}]
		}
	})
}
export const deleteTask = (id, allLists) => dispatch => (
	dispatch({
		type: DELETE__TASK,
		payload: {
			allLists: allLists,
			id: id
		}
	})
);	
export const doneTask = id => dispatch => (
	dispatch({
		type: DONE__TASK,
		payload: id
	})
);
export const dropDownSubtask = (id, activeList) => dispatch => (
	dispatch({
		type: DROP__DOWN__SUBTASK,
		payload: {
			id: id,
			activeList: activeList
		}
	})
);
export const addNewListInStore = list => dispatch => (
	dispatch({
		type: ADD__NEW__LIST__IN__STORE,
		payload: list
	})
);

export const getValueAllTasks = (selectedList, allLists) => dispatch => (
	dispatch({
		type: GET__VALUE__ALL__TASKS,
		payload: {
			selectedList: selectedList, 
			allLists: allLists
		}
	})
);


export const dragEnterTask = (
	idEnterTask,
	idStartTask, 
	activeList 
) => dispatch => {
	dispatch({
		type: DRAG__ENTER__TASK,
		payload: {
			idEnterTask: idEnterTask,
			idStartTask: idStartTask,
			activeList: activeList
		}
	})
}
export const dragEnterTaskRight = (
	indexStart, 
	activeList
) => dispatch => {
	dispatch({
		type: DRAG__ENTER__TASK__RIGHT,
		payload: {
			indexStart:indexStart,
			activeList: activeList
		}
	})
}
export const dragEnterTaskLeft = (
	idStartTask, 
	activeList
) => dispatch => {
	dispatch({
		type: DRAG__ENTER__TASK__LEFT,
		payload: {
			idStartTask:idStartTask,
			activeList: activeList
		}
	})
}
export const dragStartTask = (id, activeList) => dispatch => (
	dispatch({
		type: DRAG__START__TASK,
		payload: {
			id: id,
			activeList: activeList
		}
	})
);
export const dragEndTask = (id, activeList, lists) => dispatch => (
	dispatch({
		type: DRAG__END__TASK,
		payload: {
			id: id,
			activeList: activeList,
			lists: lists
		}
	})
);

export const saveDueDate = date => dispatch => (
	dispatch({
		type: SAVE__DUE__DATE,
		payload: date
	})
);
export const findTaskByDate = (date, list ) => dispatch => (
	dispatch({
		type: FIND__TASK__BY__DATE,
		payload: {
			date: date, 
			list: list
		}
	})
);

	

