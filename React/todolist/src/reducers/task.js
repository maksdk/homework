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
		
		if (depthEnter - depthStart !== 0) {
			let depth = depthEnter - depthStart;
			for (let i = indexStart; i < state.length; i++) {
				let currentDepth = state[i].depth.length;
				if ( depthStart >= currentDepth && i !== indexStart) break;
				state[i].depth = new Array(currentDepth + depth).fill('');
			}
		}

		if (indexStart < indexEnter) {
			let item = state.splice(indexEnter, state[indexEnter].children + 1);
			state.splice(indexStart, 0, ...item);
		} else if (indexStart > indexEnter) {
			let item = state.splice( indexStart, state[indexStart].children + 1);
			state.splice(indexEnter, 0, ...item);
			indexStart = indexEnter;
		}
		
		setFinalState(state, indexStart);
		
		return [...state];
	} else if (action.type === "SHIFT__SUBTASK__RIGHT") {
		let { index } = action.payload;
		
		let depth =  state[index].depth.length;
		for (let i = index; i < state.length; i++) {
			let currentDepth = state[i].depth.length;
			if (depth >= currentDepth && i !== index) break;
			state[i].depth = [...state[i].depth, ''];
		}
		
		let indexParent = findIndexParent (index, state),
		    allChildrenParent = state[indexParent].children,
		    allChildrenChild = state[index].children;
		state[indexParent].children = allChildrenParent + allChildrenChild + 1;
		
		setFinalState (state, index, indexParent);

		return [...state];
	} else if (action.type === "SHIFT__SUBTASK__LEFT") {
		console.log("=====================");
		let { index } = action.payload;
		//let depth = state[index].depth.length; 
		
		// let indexParent = findIndexParent(index, state);
		// let restChildren = state[indexParent].children - state[index].children - 1;
		// if (restChildren >= index - indexParent) {
		// 	let indexAfterShift = restChildren - (index - indexParent - 1) + index;
		// 	let item = state.splice(index, state[index].children + 1);
		// 	state.splice(indexAfterShift, 0, ...item);
		// }
		
		let indexParent = findIndexParent (index, state),
		    allChildrenParent = state[indexParent].children,
		    allChildrenChild = state[index].children;
		state[indexParent].children = allChildrenParent - allChildrenChild - 1;

		let depth =  state[index].depth.length;
		for (let i = index; i < state.length; i++) {
			let currentDepth = state[i].depth.length;
			if (depth >= currentDepth && i !== index) break;
			state[i].depth.splice(depth - 1, 1);
		}
		
		return [...state];
	}
	return state;
}



//functions 
function setFinalState (state, indexChild, parent) {
	let indexParent = parent || findIndexParent (indexChild, state);
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
			state[indexParent].children = i - indexParent - 1;
			if (parentDepth > currentDepth) {
				state[indexParent].lastTask = true;
			} else {
				delete state[indexParent].lastTask;
			}
			break;
		}

		if (state.length - 1 === i && parentDepth) {
			state[indexParent].lastTask = true;
		}

		if (state[indexChild].lastTask && parentDepth) {
			state[i].depth[parentDepth - 1] = '';
		} else if (parentDepth) {
			state[i].depth[parentDepth - 1] = 'lineFullVertical';
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
			console.log(i);
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