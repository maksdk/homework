export default (state = [], action) => {
	if (action.type === 'ADD__TASK') {
		return [...state, action.payload ];
	} else if (action.type === 'DELETE__TASK') {
		state.splice(action.payload, 1);
		return [...state];
	} else if (action.type === "START__DRAG__TASK") {
		let { index } = action.payload;
		state[index].hide = true;
		changeOpacity(
			index, 
			i => state[i].opacity = true, 
			state
		);
		return [...state];
	} else if (action.type === "END__DRAG__TASK") {
		let { index } = action.payload;
		delete state[index].hide;
		changeOpacity(
			index, 
			i => delete state[i].opacity, 
			state
		);
		return [...state];
	} else if (action.type === "SHIFT__TASK") {
		let { indexStart, indexEnter } = action.payload,
		    depthStart = state[indexStart].depth.length,
		    depthEnter = state[indexEnter].depth.length;

		let indexOldParent = findIndexParent (indexStart, state);

		if (depthEnter - depthStart !== 0) {
			let depth = depthEnter - depthStart;
			for (let i = indexStart; i < state.length; i++) {
				let currentDepth = state[i].depth.length;
				if ( depthStart >= currentDepth && i !== indexStart) break;
				state[i].depth = new Array(currentDepth + depth).fill('');
			}
		}

		if (indexStart < indexEnter) {
			if (depthEnter < depthStart) {
				let childrenOldParent = state[indexOldParent].children;
				let childrenStart = state[indexStart].children;
				state[indexOldParent].children = childrenOldParent - childrenStart - 1;
				if (state[indexOldParent].children === 0) {
					delete state[indexOldParent].parent;
				} 
			}
			let item = state.splice(indexEnter, state[indexEnter].children + 1);
			state.splice(indexStart, 0, ...item);
		} else if (indexStart > indexEnter) {
			if (depthEnter < depthStart) {
				let childrenEnter = state[indexEnter].children;
				let childrenStart = state[indexStart].children;
				state[indexEnter].children = childrenEnter - childrenStart - 1;
				if (state[indexEnter].children === 0) {
					delete state[indexEnter].parent;
				} 
			} else if (depthEnter > depthStart) {
				let indexNewParent = findIndexParent (indexEnter, state);

				let childrenNewParent = state[indexNewParent].children;
				let childrenStart = state[indexStart].children;
				state[indexNewParent].children = childrenNewParent + childrenStart + 1;
			}

			let item = state.splice( indexStart, state[indexStart].children + 1);
			state.splice(indexEnter, 0, ...item);
			indexStart = indexEnter;
		}

		setFinalState(state, indexStart);
		return [...state];
	} else if (action.type === "SHIFT__SUBTASK__RIGHT") {
		let { index } = action.payload;
		
		let depth = state[index].depth.length;
		for (let i = index; i < state.length; i++) {
			let currentDepth = state[i].depth.length;
			if (depth >= currentDepth && i !== index) break;
			state[i].depth = [...state[i].depth, ''];
		}
		
		let indexNewParent = findIndexParent (index, state);
		let childrenParent = state[indexNewParent].children;
		let childrenChild = state[index].children;
		state[indexNewParent].children = childrenParent + childrenChild + 1;
		
		if (state[index].lastTask){
			state[indexNewParent].lastTask = true;
		} 

		setFinalState (state, index, indexNewParent);
		return [...state];
	} else if (action.type === "SHIFT__SUBTASK__LEFT") {
		let { index } = action.payload;
		
		let indexOldParent = findIndexParent (index, state);
		let childrenParent = state[indexOldParent].children;
		let childrenChild = state[index].children;
		state[indexOldParent].children = childrenParent - childrenChild - 1;
		
		delete state[indexOldParent].lastTask;
		delete state[index].lastTask;

		if (state[indexOldParent].children === 0) {
			delete state[indexOldParent].parent;
		} else {
			let item = state.splice(index, state[index].children + 1);
			index = indexOldParent + state[indexOldParent].children + 1;
			console.log(index);
			state.splice(index, 0, ...item);	
		}

		let depth =  state[index].depth.length;
		for (let i = index; i < state.length; i++) {
			let currentDepth = state[i].depth.length;
			if (depth >= currentDepth && i !== index) break;
			state[i].depth.splice(depth - 1, 1);
		}

		let indexLastChild = findIndexLastChild(indexOldParent, state);
		if (indexLastChild) {
			state[indexLastChild].lastTask = true;
		}
		
		setFinalState (state, index, indexOldParent);
		setFinalState (state, index);
		return [...state];
	}
	return state;
}





function setFinalState (state, indexChild, parent) {
	let indexParent = isNumeric(parent) 
		? parent 
		: findIndexParent (indexChild, state);
	
	if (indexParent === false) return;
	
	let indexLastChild = findIndexLastChild(indexParent, state);
	if (indexLastChild === false) {
		delete state[indexParent].parent;
		state[indexParent].children = 0;
		return;
	}
	
	let parentDepth = state[indexParent].depth.length;
	for (let i = indexParent + 1; i < state.length; i++) {
		let currentDepth = state[i].depth.length;
		
		if (parentDepth >= currentDepth) {
			break;
		}

		if (state[i].children === 0) {
			delete state[i].parent;
		}

		if (state[indexParent].lastTask) {
			state[i].depth[parentDepth ? parentDepth - 1 : 0] = '';
		} else if (!state[indexParent].lastTask) {
			state[i].depth[parentDepth ? parentDepth - 1 : 0] = 'lineFullVertical';
		}

		if (currentDepth - parentDepth === 1) {
			delete state[i].lastTask;
			continue;
		}

		if ( i < indexLastChild && currentDepth - parentDepth > 1) {
			state[i].depth[parentDepth] = 'lineFullVertical';
			continue;
		}
		
		if ( i > indexLastChild && currentDepth - parentDepth > 1) {
			state[i].depth[parentDepth] = '';
			continue;
		}
	}
	state[indexLastChild].lastTask = true;
	state[indexParent].parent = true;
}

function findIndexLastChild(indexParent, state) {
	let parentDepth = state[indexParent].depth.length,
	    lastChildDepth = parentDepth + 1,
	    indexLastChild = false;
	for (let i = indexParent + 1; i < state.length; i++) {
		let currentDepth = state[i].depth.length;
		if (parentDepth >= currentDepth) break;
		if (lastChildDepth === currentDepth) {
			indexLastChild = i;
		}
	}
	return indexLastChild;
}

function findIndexParent (indexChild, state) {
	let parentDepth = state[indexChild].depth.length - 1,
	    indexParent = false;
	for (let i = indexChild - 1; i >= 0; i--) {
		let currentDepth = state[i].depth.length;
		if (parentDepth === currentDepth) {
			indexParent = i;
			break;
		}
	}
	return indexParent;
}

function changeOpacity (index, callback, state) {
	let depth = state[index].depth.length;
	for(let i = index + 1; i < state.length; i++) {
		let currentDepth = state[i].depth.length;
		if (depth >= currentDepth) break;
		callback(i);
	}
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}