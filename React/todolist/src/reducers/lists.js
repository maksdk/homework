import { 
	find as _find, 
	findIndex as _findIndex 
} from 'lodash';
import { ALL__TASKS, INBOX__TASKS } from '../constants/index.js';
import { 
	ADD__TASK, 
	DELETE__TASK, 
	DONE__TASK,
	DROP__DOWN__SUBTASK,
	ADD__NEW__LIST__IN__STORE,

	DRAG__ENTER__TASK,
	DRAG__START__TASK,
	DRAG__ENTER__TASK__RIGHT,
	DRAG__ENTER__TASK__LEFT,
	DRAG__END__TASK
	
}  from '../actions/actions.js';


let initialState = [{
	list: ALL__TASKS,
	tasks: [],
	downshift:[]
},{
	list: INBOX__TASKS,
	tasks: [],
	downshift:[]
}];

export default ( state = initialState , action )  => {
	if (action.type === ADD__TASK) {
		let { list, downshift, ...rest} = action.payload; 
		
		let findAll = _find(state, {list: ALL__TASKS});
		let newObj = Object.assign({}, ...rest.tasks);
		findAll.tasks.push(newObj);
		findAll.downshift = [...findAll.downshift, downshift];
		

		let isSameList = _find(state, {list: list});
		if (isSameList) {
			isSameList.tasks.push(...rest.tasks);
			isSameList.downshift = [...isSameList.downshift, downshift];
			return [...state];
		} else if (!isSameList) {
			action.payload.downshift = [...action.payload.downshift, downshift];
			return [...state, action.payload];	
		}
		return [...state];	
	} else if (action.type === DELETE__TASK) {
		let { id, allLists } = action.payload;
		
		allLists.map( ({list}) => {
			let findList = _find(state, {list: list});
			if (!findList) return;
			
			let allTasks = findList.tasks;
			let indexTask = _findIndex(allTasks, {id: id});
			if (indexTask === -1) return;
			
			let indexParent = findIndexParent (indexTask, allTasks);
			let childrenTask = findAllChildren(indexTask, allTasks);

			allTasks.splice(indexTask, 1 + childrenTask);
			setDepthLines (indexParent, allTasks);
		})

		return [...state];
	} else if (action.type === DONE__TASK) {
		let task  = action.payload;
		if (task.done) {
			delete task.done;
		} else {
			task.done = true;
		}
		return [...state];
	} else if (action.type === DROP__DOWN__SUBTASK) {
		let {id, activeList} = action.payload;

		let findList = _find(state, {list: activeList});
		let allTasks = findList.tasks;
		let indexTask = _findIndex(allTasks, {id: id});
		let childrenTask = findAllChildren(indexTask, allTasks);
		
		if (childrenTask) {
			let subtasks = allTasks.splice(indexTask + 1, childrenTask);
			allTasks[indexTask].hiddenSubtasks = [...subtasks];
		} else {
			let subtasks = allTasks[indexTask].hiddenSubtasks;
			let indexNewParent = findIndexParent(indexTask, allTasks);
			let newDepth = [...allTasks[indexTask].depth, ''];
			let prevDepth;
			subtasks.map( (item, i) => {
				if (i === 0) prevDepth = item.depth.length;
				item.depth.splice(0, prevDepth, ...newDepth);
			})
			allTasks.splice(indexTask + 1, 0, ...subtasks);
			allTasks[indexTask].hiddenSubtasks = [];
			setDepthLines (indexTask, allTasks);
			setDepthLines (indexNewParent, allTasks);
		}
		return [...state];

	}  else if (action.type === ADD__NEW__LIST__IN__STORE) {
		return [...state, {
			list: action.payload,
			downshift: [],
			tasks: []
		}];
	}




















	else if (action.type === DRAG__START__TASK) {
		//console.log("DRAG__ENTER__TASK__LEFT");
		let  {id, activeList}   = action.payload;
		
		let findList = _find(state, {list: activeList});
		let allTasks = findList.tasks;
		let indexStart = _findIndex(allTasks, {id: id});
		
		let childrenStart = findAllChildren(indexStart, allTasks);
		for (let i = indexStart + 1; i <= indexStart + childrenStart; i++) {
			allTasks[i].draggingOpacity = 'classDraggingOpacity';
		}
		
		return [...state];
	} else if (action.type === DRAG__END__TASK) {
		let  {id, activeList }   = action.payload;
		
		let findList = _find(state, {list: activeList});
		let allTasks = findList.tasks;
		let indexStart = _findIndex(allTasks, {id: id});
		
		let childrenStart = findAllChildren(indexStart, allTasks);
		for (let i = indexStart + 1; i <= indexStart + childrenStart; i++) {
			allTasks[i].draggingOpacity = '';
		
		}
		return [...state];
	} 

	else if (action.type === DRAG__ENTER__TASK) {
		////console.log("DRAG__ENTER__TASK");
		let { idEnterTask, idStartTask, activeList } = action.payload;
		
		let findList = _find(state, {list: activeList});
		let allTasks = findList.tasks;
		
		let indexStart = _findIndex(allTasks, {id: idStartTask});
		let indexEnter = _findIndex(allTasks, {id: idEnterTask});
		
		let indexOldParent = findIndexParent(indexStart, allTasks);
		let childrenStart = findAllChildren(indexStart, allTasks);
		let childrenEnter = findAllChildren(indexEnter, allTasks); 

		let depthStart = allTasks[indexStart].depth.length;
		let depthEnter = allTasks[indexEnter].depth.length;
		
		for (let i = indexStart; i <= indexStart + childrenStart; i++) {
			allTasks[i].depth.splice(0, depthStart, ...allTasks[indexEnter].depth);
		}

		let allDragTasks = allTasks.splice(indexStart, childrenStart + 1);
		let newIndex;
		if (indexStart < indexEnter) {
			newIndex = indexEnter + childrenEnter - childrenStart;
			allTasks.splice(newIndex, 0, ...allDragTasks);
		} else if (indexStart > indexEnter){
			allTasks.splice(indexEnter, 0, ...allDragTasks);
			newIndex = indexEnter;
			if (depthStart > depthEnter) {
				indexOldParent = indexOldParent + childrenStart + 1;
			}
		}

		let indexNewParent = findIndexParent(newIndex, allTasks);
		//console.log("parent");
		//console.log(indexNewParent);
		//console.log(indexOldParent);
		if (indexNewParent >= 0) {
			setDepthLines (indexNewParent, allTasks);
		} else {
			delete allTasks[newIndex].lastTask;
		}
		setDepthLines (indexOldParent, allTasks);
		setDepthLines (newIndex, allTasks);
		return [...state];	
	} 

	else if (action.type === DRAG__ENTER__TASK__RIGHT) {
		//console.log("DRAG__ENTER__TASK__RIGHT");
		let { indexStart, activeList } = action.payload;
		let findList = _find(state, {list: activeList});
		let allTasks = findList.tasks;
		
		let childrenStart = findAllChildren(indexStart, allTasks);
		let	indexOldParent = findIndexParent(indexStart, allTasks);
		
		for(let i = indexStart; i <= indexStart + childrenStart; i++) {
			allTasks[i].depth = [...allTasks[i].depth, ''];
		}
		allTasks[indexStart].lastTask = true;
		let indexNewParent = findIndexParent(indexStart, allTasks);
		//console.log("parent");
		//console.log(indexNewParent);
		//console.log(indexOldParent);
		if (indexOldParent >= 0) setDepthLines (indexOldParent, allTasks);
		if (indexNewParent >= 0) setDepthLines (indexNewParent, allTasks);
		setDepthLines (indexStart, allTasks);
		return [...state];
	} else if ( action.type === DRAG__ENTER__TASK__LEFT ) {
		//console.log("DRAG__ENTER__TASK__LEFT");
		let { idStartTask, activeList } = action.payload;
		
		let findList = _find(state, {list: activeList});
		let allTasks = findList.tasks;
		
		let indexStart = _findIndex(allTasks, {id: idStartTask});
		
		let indexOldParent = findIndexParent(indexStart, allTasks);
		let childrenOldParent =  findAllChildren(indexOldParent, allTasks);
		
		let childrenStart = findAllChildren(indexStart, allTasks);
		let restChildren = childrenOldParent - childrenStart - 1;

		for(let i = indexStart; i <= indexStart + childrenStart; i++) {
			let currentDepth = allTasks[i].depth.length;
			allTasks[i].depth.splice(currentDepth - 1, 1);
		}
		let newIndex = indexStart;
		if (restChildren > 0) {
			let taskStart = allTasks.splice(indexStart, childrenStart + 1);
			newIndex = indexOldParent + restChildren + 1;
			allTasks.splice(newIndex, 0, ...taskStart);
		}
		
		let indexNewParent = findIndexParent(newIndex, allTasks);
		//console.log("parent");
		//console.log(indexNewParent);
		//console.log(indexOldParent);
		if (indexNewParent >= 0) {
			setDepthLines (indexNewParent, allTasks);
		} else {
			delete allTasks[indexStart].lastTask;
		}
		if (indexOldParent >= 0) setDepthLines (indexOldParent, allTasks);
		setDepthLines (newIndex, allTasks);
		return [...state];
	}
	  
	return [...state];
}




function setDepthLines (indexParent, allTasks) {
	if(indexParent === undefined) return;
	let indexLastChild = findIndexLastChild(indexParent, allTasks);
	//console.log("setDepthLines");
		//console.log(indexParent);
		//console.log(indexLastChild);
	if (indexLastChild === false) {
		delete allTasks[indexParent].parent;
		return;
	}
	
	let parentDepth = allTasks[indexParent].depth.length;
	for (let i = indexParent + 1; i < allTasks.length; i++) {
		let currentDepth = allTasks[i].depth.length;
		// console.log("setDepthLines");
		// console.log(parentDepth >= currentDepth);
		// console.log(currentDepth - parentDepth === 1);
		// console.log( i < indexLastChild && currentDepth - parentDepth > 1);
		// console.log( i > indexLastChild && currentDepth - parentDepth > 1);
		if (parentDepth >= currentDepth) {
			break;
		}
		if (currentDepth - parentDepth === 1) {
			delete allTasks[i].lastTask;
			continue;
		}
		if ( i < indexLastChild && currentDepth - parentDepth > 1) {
			allTasks[i].depth[parentDepth] = 'lineFullVertical';
			continue;
		}
		if ( i > indexLastChild && currentDepth - parentDepth > 1) {
			allTasks[i].depth[parentDepth] = '';
			continue;
		}
	}
	allTasks[indexLastChild].lastTask = true;
	allTasks[indexParent].parent = true;
}

function findIndexLastChild(indexParent, allTasks) {
	//console.log("findIndexLastChild");
		//console.log(indexParent);
	let parentDepth = allTasks[indexParent].depth.length,
	    lastChildDepth = parentDepth + 1,
	    indexLastChild = false;
	for (let i = indexParent + 1; i < allTasks.length; i++) {
		let currentDepth = allTasks[i].depth.length;
		if (parentDepth >= currentDepth) break;
		if (lastChildDepth === currentDepth) {
			indexLastChild = i;
		}
	}
	return indexLastChild;
}
function findAllChildren(indexParent, state) {
	//console.log("findAllChildren");
		//console.log(indexParent);
	let parentDepth = state[indexParent].depth.length;
	let children = 0;
	for (let i = indexParent + 1; i < state.length; i++) {
		let currentDepth = state[i].depth.length;
		if (parentDepth >= currentDepth) break;
		children = i - indexParent;
	}

	return children;
}

function findIndexParent (indexChild, allTasks) {
	//console.log("findIndexParent");
		//console.log(indexChild);
	let parentDepth = allTasks[indexChild].depth.length - 1,
	    indexParent = undefined;
	for (let i = indexChild - 1; i >= 0; i--) {
		let currentDepth = allTasks[i].depth.length;
		if (parentDepth === currentDepth) {
			indexParent = i;
			break;
		}
	}
	return indexParent;
}



