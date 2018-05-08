import { 
	find as _find, 
} from 'lodash';

import { 
	INBOX__TASKS
} from '../constants/index.js';

import { 
	ADD__TASK, 
	DELETE__TASK, 
	DONE__TASK,
	DROP__DOWN__SUBTASK,
	ADD__NEW__LIST__IN__STORE
}  from '../actions/actions.js';

import {
	findAllSubtasks,
	findIndexParent,
	setDepthLines,
	findIndexLastChild
} from './helpers/helpers.js';

let initialState = [{
	list: INBOX__TASKS,
	tasks: [],
	downshift:[]
}];

export default ( state = initialState , action )  => {
	if (action.type === ADD__TASK) {
		let { list } = action.payload; 
		let list_newList = _find(state, {list: list}).tasks;
		list_newList.push(action.payload);
		return [...state];	
	} else if (action.type === DELETE__TASK) {
		let { index, task } = action.payload;
		let list =  _find(state, {list: task.list}).tasks;
		let subtasks = findAllSubtasks(index, list);
		list.splice(index, 1 + subtasks);
		return [...state];
	} else if (action.type === DONE__TASK) {
		let {task, index}  = action.payload;
		let list =  _find(state, {list: task.list}).tasks;
		let subtasks = findAllSubtasks(index, list);
		
		if (task.done) {
			for (let i = index; i <= index + subtasks; i++ ) {
				list[i].done = false;
			}
		} else {
			for (let i = index; i <= index + subtasks; i++ ) {
				list[i].done = true;
			}
		}
		return [...state];
	} else if (action.type === DROP__DOWN__SUBTASK) {
		let {index, task} = action.payload;
		let list = _find(state, {list: task.list}).tasks;
		let subtasks = findAllSubtasks(index, list);

		if (subtasks) {
			let items = list.splice(index + 1, subtasks);
			list[index].hiddenSubtasks = [...items];
		} else {
			let items = list[index].hiddenSubtasks;
			let indexParent = findIndexParent(index, list);
			
			let newDepth = [...list[index].depth, ''];
			let prevDepth;
			
			items.map( (item, i) => {
				if (i === 0) prevDepth = item.depth.length;
				item.depth.splice(0, prevDepth, ...newDepth);
			})

			list.splice(index + 1, 0, ...items);
			list[index].hiddenSubtasks = [];
			setDepthLines (index, list);
			setDepthLines (indexParent, list);
		}
		return [...state];
	}  else if (action.type === ADD__NEW__LIST__IN__STORE) {
		return [...state, {
			list: action.payload,
			downshift: [],
			tasks: []
		}];
	}





	// else if (action.type === DRAG__START__TASK) {
	// 	let  {id, activeList}   = action.payload;
		
	// 	let findList = _find(state, {list: activeList});
	// 	let allTasks = findList.tasks;
	// 	let indexStart = _findIndex(allTasks, {id: id});
		
	// 	let childrenStart = findAllSubtasks(indexStart, allTasks);
	// 	for (let i = indexStart + 1; i <= indexStart + childrenStart; i++) {
	// 		allTasks[i].draggingOpacity = ;
	// 	}
		
	// 	return [...state];
	// } else if (action.type === DRAG__END__TASK) {
	// 	let  {id, activeList }   = action.payload;
		
	// 	let findList = _find(state, {list: activeList});
	// 	let allTasks = findList.tasks;
	// 	let indexStart = _findIndex(allTasks, {id: id});
		
	// 	let childrenStart = findAllSubtasks(indexStart, allTasks);
	// 	for (let i = indexStart + 1; i <= indexStart + childrenStart; i++) {
	// 		allTasks[i].draggingOpacity = '';
		
	// 	}
	// 	return [...state];
	// } 

	// else if (action.type === DRAG__ENTER__TASK) {
	// 	let { idEnterTask, idStartTask, activeList } = action.payload;
		
	// 	let findList = _find(state, {list: activeList});
	// 	let allTasks = findList.tasks;
		
	// 	let indexStart = _findIndex(allTasks, {id: idStartTask});
	// 	let indexEnter = _findIndex(allTasks, {id: idEnterTask});
		
	// 	let indexOldParent = findIndexParent(indexStart, allTasks);
	// 	let childrenStart = findAllSubtasks(indexStart, allTasks);
	// 	let childrenEnter = findAllSubtasks(indexEnter, allTasks); 

	// 	let depthStart = allTasks[indexStart].depth.length;
	// 	let depthEnter = allTasks[indexEnter].depth.length;
		
	// 	for (let i = indexStart; i <= indexStart + childrenStart; i++) {
	// 		allTasks[i].depth.splice(0, depthStart, ...allTasks[indexEnter].depth);
	// 	}

	// 	let allDragTasks = allTasks.splice(indexStart, childrenStart + 1);
	// 	let newIndex;
	// 	if (indexStart < indexEnter) {
	// 		newIndex = indexEnter + childrenEnter - childrenStart;
	// 		allTasks.splice(newIndex, 0, ...allDragTasks);
	// 	} else if (indexStart > indexEnter){
	// 		allTasks.splice(indexEnter, 0, ...allDragTasks);
	// 		newIndex = indexEnter;
	// 		if (depthStart > depthEnter) {
	// 			indexOldParent = indexOldParent + childrenStart + 1;
	// 		}
	// 	}

	// 	let indexNewParent = findIndexParent(newIndex, allTasks);
	// 	if (indexNewParent >= 0) {
	// 		setDepthLines (indexNewParent, allTasks);
	// 	} else {
	// 		delete allTasks[newIndex].lastTask;
	// 	}
	// 	setDepthLines (indexOldParent, allTasks);
	// 	setDepthLines (newIndex, allTasks);
	// 	return [...state];	
	// } 

	// else if (action.type === DRAG__ENTER__TASK__RIGHT) {
	// 	let { indexStart, activeList } = action.payload;
	// 	let findList = _find(state, {list: activeList});
	// 	let allTasks = findList.tasks;
		
	// 	let childrenStart = findAllSubtasks(indexStart, allTasks);
	// 	let	indexOldParent = findIndexParent(indexStart, allTasks);
		
	// 	for(let i = indexStart; i <= indexStart + childrenStart; i++) {
	// 		allTasks[i].depth = [...allTasks[i].depth, ''];
	// 	}
	// 	allTasks[indexStart].lastTask = true;
	// 	let indexNewParent = findIndexParent(indexStart, allTasks);
	// 	if (indexOldParent >= 0) setDepthLines (indexOldParent, allTasks);
	// 	if (indexNewParent >= 0) setDepthLines (indexNewParent, allTasks);
	// 	setDepthLines (indexStart, allTasks);
	// 	return [...state];
	// } else if ( action.type === DRAG__ENTER__TASK__LEFT ) {
	// 	let { idStartTask, activeList } = action.payload;
		
	// 	let findList = _find(state, {list: activeList});
	// 	let allTasks = findList.tasks;
		
	// 	let indexStart = _findIndex(allTasks, {id: idStartTask});
		
	// 	let indexOldParent = findIndexParent(indexStart, allTasks);
	// 	let childrenOldParent =  findAllSubtasks(indexOldParent, allTasks);
		
	// 	let childrenStart = findAllSubtasks(indexStart, allTasks);
	// 	let restChildren = childrenOldParent - childrenStart - 1;

	// 	for(let i = indexStart; i <= indexStart + childrenStart; i++) {
	// 		let currentDepth = allTasks[i].depth.length;
	// 		allTasks[i].depth.splice(currentDepth - 1, 1);
	// 	}
	// 	let newIndex = indexStart;
	// 	if (restChildren > 0) {
	// 		let taskStart = allTasks.splice(indexStart, childrenStart + 1);
	// 		newIndex = indexOldParent + restChildren + 1;
	// 		allTasks.splice(newIndex, 0, ...taskStart);
	// 	}
		
	// 	let indexNewParent = findIndexParent(newIndex, allTasks);
	// 	if (indexNewParent >= 0) {
	// 		setDepthLines (indexNewParent, allTasks);
	// 	} else {
	// 		delete allTasks[indexStart].lastTask;
	// 	}
	// 	if (indexOldParent >= 0) setDepthLines (indexOldParent, allTasks);
	// 	setDepthLines (newIndex, allTasks);
	// 	return [...state];
	// }
	return [...state];
}







