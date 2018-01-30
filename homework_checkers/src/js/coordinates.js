		
function sortCoord(arrDelete, arrMove, arrCoordMove, arrCoordDel, index, valid) {
	var cx_left = arrMove[index].cx,
	    cy_left = arrMove[index].cy;
	
	var cx_rigth = arrMove[index + 1].cx,
		cy_rigth = arrMove[index + 1].cy;
	
	var cx_mid_potent = (cx_left - cx_rigth) > 0 ? cx_left - sizeRect : cx_rigth -sizeRect,
	    cy_mid_potent = (cy_left - cy_rigth) > 0 ? cy_left - sizeRect : cy_rigth -
	    sizeRect;
	
	var cx_mid_real = arrDelete[index].cx,
	    cy_mid_real = arrDelete[index].cy;
	
	var validPush = (cx_left != cx_rigth) && (cy_left != cy_rigth) &&
		(Math.abs(cx_left - cx_rigth) == sizeRect*2) && 
		(Math.abs(cy_left - cy_rigth) == sizeRect*2) &&
		cx_mid_potent == cx_mid_real && cy_mid_potent == cy_mid_real ;
	
	if (validPush){
		valid = true;
		if (arrDelete.length > index + 1 && arrDelete.length > 1) {
			sortCoord(arrDelete, arrMove, arrCoordMove, arrCoordDel, index + 1, true);
		} else {
			var validCoordMove = arrMove.slice(0, index + 2),
			    validCoordDel = arrDelete.slice(0, index + 1);
			
			arrCoordMove.push(validCoordMove) ;
			arrCoordDel.push(validCoordDel);
		}
	} else if (!validPush){
		if (valid){
			var validCoordMove = arrMove.slice(0, index + 1),
				validCoordDel = arrDelete.slice(0, index);
			
			arrCoordMove.push(validCoordMove) ;
			arrCoordDel.push(validCoordDel);
		}
		
		arrMove.splice(index, 1);
		arrDelete.splice(index - 1, 1);
		sortCoord(arrDelete, arrMove, arrCoordMove, arrCoordDel, index - 1, false);
	} 
}

function addCoordDelete(cx, cy, arrDelete) {
	var del = {
		cx,
		cy
	};
	arrDelete.push(del);
	return arrDelete;
}

function addCoordMove(cx, cy, arrMove) {
	var move = {
		cx,
		cy
	};
	arrMove.push(move);
	return arrMove;
}