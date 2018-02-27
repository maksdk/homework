function findCoords(x, y, colorElement, arrDelete, arrMove, way, queen, next){
	if (!arrMove.length) { addCoordMove(x, y, arrMove) }
	
	let [cx, cy, wayTop, wayLow, wayColor] = setCoords(x, y, way);
	
	if (!validCoord(cx, cy)) return;
		
	let nextElem = findNextElem(cx, cy),
		free = (nextElem == "free" && 
			(queen || colorElement == wayColor)) && 
			(next == undefined);
		
	if (free) {
		let rect = createActiveRect(cx, cy, colorElement);
        rect.classList.add("simpleMove");
		if(queen){
			findCoords(cx, cy, colorElement, arrDelete, arrMove, way, queen, next);
		}
	} else if ((nextElem == "black" && colorElement == "white") || 
				 (nextElem == "white" && colorElement == "black")) {
			
			let [cx_after, cy_after] = setCoords(cx, cy, way);
			
			if ((findNextElem(cx_after, cy_after) == "free") && 
				validCoord(cx_after, cy_after) && 
				searchSimilarDelete(cx, cy, arrDelete) != true)  {
				
				addCoordDelete(cx, cy, arrDelete);
				addClassDelete(cx, cy);
				
				next = true;
				findCoords(cx, cy, colorElement, arrDelete, arrMove, way, queen, next);
			}	
	} else if (nextElem == "free" && next != undefined){
			let rect = createActiveRect(cx, cy, colorElement);
        	rect.classList.add("kickMove");
			addCoordMove(cx, cy, arrMove);
        	
			let [cx_after, cy_after] = setCoords(cx, cy, way);
			
			if((findNextElem(cx_after, cy_after) != "free" || queen) &&
				validCoord(cx_after, cy_after)) {
				findCoords(cx, cy, colorElement, arrDelete, arrMove, way, queen, next);
			}
			
			findCoords(cx, cy, colorElement, arrDelete, arrMove, wayTop, queen);
			findCoords(cx, cy, colorElement, arrDelete, arrMove, wayLow, queen);
	}
}

function setCoords(cx, cy, way) {
	let wayTop, wayLow, wayColor;
	if (way === "topLeft") {
		cx  = Math.floor(cx - sizeRect), 
		cy  = Math.floor(cy - sizeRect),
		wayTop = "topRigth",
		wayLow = "lowLeft",
		wayColor = "white";
	} else if (way === "topRigth") {
		cx  = Math.floor(cx + sizeRect), 
		cy  = Math.floor(cy - sizeRect),
		wayTop = "topLeft",
		wayLow = "lowRigth",
		wayColor = "white";
	} else if (way === "lowLeft") {
		cx  = Math.floor(cx - sizeRect), 
		cy  = Math.floor(cy + sizeRect);
		wayTop = "topLeft",
		wayLow = "lowRigth",
		wayColor = "black";
	} else if (way === "lowRigth") {
		cx  = Math.floor(cx + sizeRect), 
		cy    = Math.floor(cy + sizeRect);
		wayTop = "topRigth",
		wayLow = "lowLeft",
		wayColor = "black";
	}
	return [cx, cy, wayTop, wayLow, wayColor];
}

//пушим в массив координаты фигуры, которую бьют
function addCoordDelete(cx, cy, arrDelete) {
	var del = {
		cx,
		cy,
		flag : "delete"
	};
	arrDelete.push(del);
	return arrDelete;
}

//пушим в массив координаты фигуры, которая бьет
function addCoordMove(cx, cy, arrMove) {
	var move = {
		cx,
		cy,
		flag : "move"
	};
	arrMove.push(move);
	return arrMove;
}