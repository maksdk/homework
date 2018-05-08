export const  findAllSubtasks = (indexParent, state) => {
	let parentDepth = state[indexParent].depth.length;
	let children = 0;
	for (let i = indexParent + 1; i < state.length; i++) {
		let currentDepth = state[i].depth.length;
		if (parentDepth >= currentDepth) break;
		children = i - indexParent;
	}
	return children;
}

export const  findIndexParent = (indexChild, allTasks) => {
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

export const  findIndexLastChild = (indexParent, allTasks) => {
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

export const setDepthLines = (indexParent, allTasks) => {
	if(indexParent === undefined) return;
	let indexLastChild = findIndexLastChild(indexParent, allTasks);
	if (indexLastChild === false) {
		delete allTasks[indexParent].parent;
		return;
	}
	let parentDepth = allTasks[indexParent].depth.length;
	for (let i = indexParent + 1; i < allTasks.length; i++) {
		let currentDepth = allTasks[i].depth.length;
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
