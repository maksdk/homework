function findCoords(x, y, colorElem, route, queen,  firstEnter, remove, move, simpleMove, next){
	if (move == undefined) {
		remove = [],
		move = [],
		simpleMove = [];
		pushCoordsInArr(+x, +y, "move", move);
	}

	let [cx, cy, routeTop, routeLow, routeColor] = setCoords(x, y, route),
			nextElem = findNextElem(cx, cy),
			free = (nextElem == "free" && 
			(queen || colorElem == routeColor)) && 
			(next == undefined);

	if (free) {
		if (!simpleMove.length) {
	 		pushCoordsInArr(+x, +y, "startMove", simpleMove);
	 	}
		
		pushCoordsInArr(cx, cy, "simpleMove", simpleMove);
		
		if (queen) {
	  		findCoords(cx, cy, colorElem, route, queen, null, remove, move, simpleMove,   next);
		}
	} else if ((nextElem == "black" && colorElem == "white") || 
	 			(nextElem == "white" && colorElem == "black")) {
		
		let [cx_after, cy_after] = setCoords(cx, cy, route),
			nextElem = findNextElem(cx_after, cy_after),
			similarElem = searchSimilarDelete(cx, cy, remove);

		if (nextElem == "free" && !similarElem)  {
			let spec = specialCheckRemove(remove, cx, cy);
			
			if (spec) {
				[remove, move] = specialSortRemove(remove, move, cx, cy);
			}
			
			pushCoordsInArr(cx, cy, "delete", remove);
			addClassDelete(cx, cy);
			next = true;
			findCoords(cx, cy, colorElem, route, queen,  null, remove, move, simpleMove, next);
			
			if (spec) {
				element.specialMove = move;
				element.specialRemove = remove;
			}
		}	
	} else if (nextElem == "free" && next != undefined){
		pushCoordsInArr(cx, cy, "move", move);
		let [cx_after, cy_after] = setCoords(cx, cy, route),
			nextElem = findNextElem(cx_after, cy_after); 

		if (cy == size / 2 || cy == size * 7.5) {
			queen = true;
		}
		
		if (nextElem != "free" || queen) {
			findCoords(cx, cy, colorElem, route, queen, null, remove, move, simpleMove,  next);
		}
		findCoords(cx, cy, colorElem, routeTop, queen, null, remove, move, simpleMove);
		findCoords(cx, cy, colorElem, routeLow, queen, null, remove, move, simpleMove);
	}
		return [move, remove, simpleMove];
}



function setCoords(cx, cy, route) {
	let routeTop, routeLow, routeColor;
	if (route === "topLeft") {
		cx  = Math.floor(+cx - size), 
		cy  = Math.floor(+cy - size),
		routeTop = "topRigth",
		routeLow = "lowLeft",
		routeColor = "white";
	} else if (route === "topRigth") {
		cx  = Math.floor(+cx + size), 
		cy  = Math.floor(+cy - size),
		routeTop = "topLeft",
		routeLow = "lowRigth",
		routeColor = "white";
	} else if (route === "lowLeft") {
		cx  = Math.floor(+cx - size), 
		cy  = Math.floor(+cy + size);
		routeTop = "topLeft",
		routeLow = "lowRigth",
		routeColor = "black";
	} else if (route === "lowRigth") {
		cx  = Math.floor(+cx + size), 
		cy    = Math.floor(+cy + size);
		routeTop = "topRigth",
		routeLow = "lowLeft",
		routeColor = "black";
	}
	return [cx, cy, routeTop, routeLow, routeColor];
}


function pushCoordsInArr(cx, cy, flag, array) {
	let obj = {
		cx,
		cy,
		flag
	};
	array.push(obj);
	return array;
}


function  findNextElem(cx, cy){
	if (!validCoord(cx, cy)) return  false;
	
	let nextElem = "free",
		circle = [...document.querySelectorAll('circle')];
	
	top:
	for (let i = 0; i < circle.length; i++) {
		let cxNextElem = circle[i].getAttribute("cx"),
				cyNextElem = circle[i].getAttribute("cy"),
				colorNextElem = circle[i].classList.contains('white') ? "white" : "black";

		if ( cxNextElem == cx && cyNextElem == cy && colorNextElem ==='white'){
				nextElem = "white"
				break top;
		} else if (cxNextElem == cx && cyNextElem == cy && colorNextElem ==='black'){
				nextElem = "black";		
				break top;
		}
	}
	return nextElem;
}	


function validCoord(cx, cy) {
	return ((0 <= cx && cx <= size*8) && 
			(0 <= cy && cy <= size*8)) ? true : false
}


function searchSimilarDelete(cx, cy, arrDelete){
	let similar = false;
	arrDelete.forEach( elem => {
		if (elem.cx == cx && elem.cy == cy){
			return similar = true;
		}
	});
	return similar;
}

function addClassDelete(cx, cy){
	let circles = document.querySelectorAll('circle');

	[...circles].forEach( elem => {
		let cxElem = elem.getAttribute("cx"),
			  cyElem = elem.getAttribute("cy");
		if (cxElem == cx && cyElem == cy){
			elem.classList.add('delete');
		}
	});
}


function specialCheckRemove(remove, cx, cy) {
	let neighbor;
	for (let i = 0; i < remove.length; i++) {
			neighbor = Math.abs(remove[i].cx - cx) == size &&
					Math.abs(remove[i].cy - cy) == size;
			if(!neighbor) continue;
			break;
	}
	return neighbor;
}
				

function specialSortRemove(remove, move, cx, cy){
	sortCoords(remove, move, 0, 0, 0);
	
	let coords = JSON.parse(JSON.stringify(element.coordsMove)) ;
	
	top:
	for (let i = 0; i < coords.length; i++) {
		let itemCoords = coords[i]; 
		for (let index = 0; index < itemCoords.length; index++) {
			
			let valid = itemCoords[index].cx - cx == size &&
				itemCoords[index].cy - cy == size;
			
			if (!valid) continue;
			
			let arr =  itemCoords.slice(0, index - 1);
			remove = [];
			move = [];
			
			for (let c = 0; c < arr.length; c++) {
				if (arr[c].flag == "move") {
					move.push(arr[c]);
				} else if (arr[c].flag == "delete") {
					remove.push(arr[c]);
				}
			}
			break top;
		}
	}
	return [remove, move];
}