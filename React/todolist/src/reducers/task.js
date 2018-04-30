export default (state = [], action) => {
	if (action.type === 'ADD__TASK') {
		
		let index = state.length;
		state = [...state, action.payload];
		state[index].depth = ['', ...state[index].depth];
		console.log(state[index]);
		// console.log(state[index].depth);
		return [...state];
	} else if (action.type === 'DELETE__TASK') {
		let { index } = action.payload;
		let children = findAllChildren(index, state);
		state.splice( index, children + 1);
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
		let { indexStart, indexEnter } = action.payload;
		
		let childrenStart = findAllChildren(indexStart, state), 
		    childrenEnter = findAllChildren(indexEnter, state),
		    depthStart = state[indexStart].depth.length,
		    depthEnter = state[indexEnter].depth.length;
		
		if (depthStart > depthEnter) {
			let indexParentStart = findIndexParent(indexStart, state);
			for (let i = indexStart; i <= indexStart + childrenStart; i++) {
				state[i].depth.splice(0, depthStart, ...state[indexEnter].depth);
				if (state[i].depth.length === 0) {
					delete state[indexStart].lastTask;
				}
			}
			let childrenParentStart = findAllChildren(indexParentStart, state);
			if (childrenParentStart === 0) {
				delete state[indexParentStart].parent;
			}
		} else if (depthStart < depthEnter) {
			let indexStartParent = findIndexParent(indexStart, state);
			for (let i = indexStart; i <= indexStart + childrenStart; i++) {
				state[i].depth.splice(0, depthStart, ...state[indexEnter].depth);
			}
			if (state[indexStart].lastTask) {
				setFinalState(state, indexStart, indexStartParent);
			}
			delete state[indexStart].lastTask;
		}
		
		let item = state.splice(indexStart, childrenStart + 1);
		let newIndex;
		if (indexStart < indexEnter) {
			newIndex = indexEnter + childrenEnter - childrenStart;
			state.splice(newIndex, 0 , ...item);
		} else if (indexStart > indexEnter) {
			state.splice(indexEnter, 0 , ...item);
			newIndex = indexEnter;
		}

		setFinalState(state, newIndex);
		return [...state];
	} else if (action.type === "SHIFT__SUBTASK__RIGHT") {
		let { index } = action.payload;
		let children = findAllChildren(index, state);
		
		for (let i = index; i <= index + children; i++) {
			state[i].depth = [...state[i].depth, ''];
		}
		
		let indexNewParent = findIndexParent (index, state);
		if (state[index].lastTask || state[index].firstTask){
			state[indexNewParent].lastTask = true;
			delete  state[index].firstTask;
		}

		console.log(state[indexNewParent]);
		if (state[indexNewParent].hiddenChildren) {
			state.splice(index + children + 1, 0, ...state[indexNewParent].hiddenChildren);
			delete state[indexNewParent].hiddenChildren;
		}

		setFinalState (state, index, indexNewParent);
		return [...state];
	} else if (action.type === "SHIFT__SUBTASK__LEFT") {
		let { index } = action.payload;

		let indexParent = findIndexParent(index, state);
		
		if (indexParent === false) {
			delete state[index].lastTask;
			state[index].firstTask = true;
			return;
		}

		let childrenParent = findAllChildren(indexParent, state);
		let childrenChild = findAllChildren(index, state);
		let restChildren = childrenParent - childrenChild - 1;
		
		if (state[indexParent].lastTask) {
			delete state[indexParent].lastTask;
			state[index].lastTask = true;
		} else if (!state[indexParent].lastTask) {
			delete state[index].lastTask;
		}

		for (let i = index; i <= index + childrenChild; i++) {
			let currentDepth = state[i].depth.length;
			state[i].depth.splice(currentDepth - 1, 1);
		}

		if (restChildren === 0) {
			delete state[indexParent].parent;
		} else if (restChildren > 0) {
			let item = state.splice(index, childrenChild + 1);
			index = indexParent + restChildren + 1;
			state.splice(index, 0, ...item);
		}
		
		setFinalState (state, null, indexParent);	
		setFinalState (state, index);
		return [...state];
	} else if (action.type === "HIDE__OPEN__SUBTASK") {
		let { index } = action.payload;

		if (state[index].hiddenChildren) {
			state.splice(index + 1, 0, ...state[index].hiddenChildren);
			delete state[index].hiddenChildren;
		} else if (!state[index].hiddenChildren){
			let children = findAllChildren(index, state);
			state[index].hiddenChildren = state.splice(index + 1, children);
		}
		return [...state];
	} else if (action.type === "DONE__TASK") {
		let { index } = action.payload;
		let children = findAllChildren(index, state);
		console.log(index);
		for(let i = index; i <= index + children; i++) {
			state[i].done = true;
		}
		return [...state];
	}
	return state;
}


function setFinalState (state, indexChild, parent) {
	let indexParent = isNumeric(parent) 
		? parent 
		: findIndexParent (indexChild, state);
	
	if (indexParent === false) {
		delete state[indexChild].lastTask;
		return;
	}
	
	let indexLastChild = findIndexLastChild(indexParent, state);
	if (indexLastChild === false) {
		delete state[indexParent].parent;
		return;
	}
	
	let parentDepth = state[indexParent].depth.length;
	for (let i = indexParent + 1; i < state.length; i++) {
		let currentDepth = state[i].depth.length;
		if (parentDepth >= currentDepth) {
			break;
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

function findAllChildren(indexParent, state) {
	let parentDepth = state[indexParent].depth.length;
	let children = 0;
	for (let i = indexParent + 1; i < state.length; i++) {
		let currentDepth = state[i].depth.length;
		if (parentDepth >= currentDepth) break;
		children = i - indexParent;
	}

	return children;
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}