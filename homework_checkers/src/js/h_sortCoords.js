function sortCoords(remove, move, indexMove, indexRemove, count, queen, invalid, arr) {
	if (indexMove < 0 || indexRemove < 0 ||
		indexMove + 1 >= move.length ||
		indexRemove + 1 > remove.length) return;

	arr == undefined ? arr = [] : false;
	
	let cx_1 = move[indexMove].cx,
	    cy_1 = move[indexMove].cy;
	
	let cx_2 = move[indexMove + 1].cx,
		cy_2 = move[indexMove + 1].cy;
	
	let cx_mid = remove[indexRemove].cx,
	    cy_mid = remove[indexRemove].cy;
	
	let cx = (cx_2 - cx_1) > 0 ? cx_2 - size : 
			  cx_2 + size,
		cy = (cy_2 - cy_1) > 0 ? cy_2 - size : 
			  cy_2 + size;

	let validCx, validCy;
	if (indexMove >= 1) {
		let cx_0 = move[indexMove - 1].cx,
		    cy_0 = move[indexMove - 1].cy;
		if ((cx_2 - cx_1) > 0) {
			cx = cx_2 - size;
			validCx = cx_1 <= cx_0;
		} else {
			cx = cx_2 + size;
			validCx = cx_1 >= cx_0;
		}

		if ((cy_2 - cy_1) > 0) {
			cy = cy_2 - size;
			validCy = cy_1 <= cy_0;
		} else {
			cy = cy_2 + size;
			validCy = cy_1 >= cy_0;
		}
	}
				
	let neighbor = (Math.abs(cx_1 - cx_2) == size) && 
				   (Math.abs(cy_1 - cy_2) == size);
	
	let validMove = (cx == cx_mid) &&
					(cy == cy_mid) &&
					(Math.abs(cx_1 - cx_2) ==
					Math.abs(cy_1 - cy_2)) && 
					(validCx != true || validCy != true);
				
	if (arr.length > 0 && queen == true) {
		var queenMoveValid = arr[arr.length - 1 - count].flag == "delete";
	}

	if (queenMoveValid)	{
		element.coordsMove.push(arr);
		remove.splice(indexRemove - 1, 1);
		indexRemove -= 1; 
		arr = [];
		queen = false;
		count = 0;
	}

	if (validMove){
		if (arr.length == 0) {
			for (var i = 0; i < indexMove; i++) {
				var elem = move[i];
					arr.push(elem);
					if(indexRemove > i) {
						elem = remove[i];
						arr.push(elem);
					}
				}
			}
		if (remove.length == indexRemove + 1) {
			if (queen && count && !queenMoveValid) {
				var index = arr.length - count - 1;
				arr.splice(index, count + 1);
			}
			var elem = move.slice(indexMove, indexMove + 1);
				arr.push(elem[0]);
				elem = remove.slice(indexRemove, indexRemove + 1);
				arr.push(elem[0]);
			if (move.length - 1 > indexMove) {
				for (var i = indexMove + 1; i < move.length; i++) {
					
					arr.push(move[i]);
				}
			}
			element.coordsMove.push(arr);
		} else {
				if (queen && count && !queenMoveValid) {
					var index = arr.length - count - 1;
					arr.splice(index, count + 1);
				}
				var elem = move.slice(indexMove, indexMove + 1);
					arr.push(elem[0]);
					elem = remove.slice(indexRemove, indexRemove + 1);
					arr.push(elem[0]);
					sortCoords(remove, move, indexMove + 1, indexRemove + 1, 0, false, false, arr);
		}
	} else if (neighbor) {
		var elem = move.slice(indexMove, indexMove + 1);
			arr.push(elem[0]);
		sortCoords(remove, move, indexMove + 1, indexRemove, count, true, false, arr);
	
	}else if (!validMove) {
		if (queen == true) {
			if (count == 0) {
				var elem = move.slice(indexMove, indexMove + 1);
				arr.push(elem[0]);
			}
			move.splice(indexMove, 1);
			sortCoords(remove, move, indexMove - 1, indexRemove, count + 1, true, false, arr);
		} else if (arr.length > 0) {
			var elem = move.slice(indexMove, indexMove + 1);
				arr.push(elem[0]);
				element.coordsMove.push(arr);
		} 
		
		if (queen == false && invalid == false) {
			move.splice(indexMove, 1);
			remove.splice(indexRemove - 1, 1);
			arr = [];
			sortCoords(remove, move, indexMove - 1, indexRemove - 1, 0, false, true, arr);
		} else {
			move.splice(indexMove, 1);
			arr = [];
			sortCoords(remove, move, indexMove - 1, indexRemove, 0, false, true, arr);
		}
	}
}