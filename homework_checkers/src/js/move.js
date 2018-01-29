
function moveTopLeft(cx, cy, colorElement, activeCircle, arr, colorTopLeft){
	cx  = Math.floor(cx - sizeRect), 
	cy  = Math.floor(cy - sizeRect);
	if (!validCoord(cx, cy)) { return }
	
	var king = activeCircle.classList.contains("king");
	var free = (checkMove(cx, cy) == "free" && 
			   (king || colorElement == "white")) && 
			   (colorTopLeft == undefined);
	
	if (free) {
		var rect = createActiveRect(cx, cy, colorElement);
	        rect.classList.add("clearUsual");
		
		if(king){
			moveTopLeft(cx,cy,colorElement,activeCircle,arr,colorTopLeft);
		}
	}else if ((checkMove(cx, cy) == "black" && colorElement == "white") || 
			 (checkMove(cx, cy) == "white" && colorElement == "black")) {
			 var cx_after = Math.floor(cx - sizeRect),
				 cy_after = Math.floor(cy - sizeRect);

			if((checkMove(cx_after, cy_after) == "free"))  {
				colorTopLeft = true;
	       		moveTopLeft(cx,cy,colorElement,activeCircle,arr,colorTopLeft);
			}	
	}else if (checkMove(cx, cy) == "free" && colorTopLeft != undefined){
			var rect = createActiveRect(cx, cy, colorElement);
        		rect.classList.add("clearRectUpper");
        	
        	var cx_after = Math.floor(cx - sizeRect),
				cy_after = Math.floor(cy - sizeRect);
			if(checkMove(cx_after, cy_after) != "free" || king) {
				moveTopLeft(cx,cy,colorElement,activeCircle,arr,colorTopLeft);
			}
			moveTopRigth(cx,cy,colorElement,activeCircle,arr);
		    moveLowLeft(cx,cy,colorElement,activeCircle,arr);
	}
  	return arr;
}

function moveTopRigth(cx,cy,colorElement,activeCircle,arr,colorTopRigth){
	cx  = Math.floor(cx + sizeRect), 
	cy    = Math.floor(cy - sizeRect);
	if (!validCoord(cx, cy)) { return }
	
	var king = activeCircle.classList.contains("king");
	var free = (checkMove(cx, cy) == "free" && 
			   (king || colorElement == "white")) && 
			   (colorTopRigth == undefined);
			   
	if (free) {
		var rect = createActiveRect(cx, cy, colorElement);
        	rect.classList.add("clearUsual");
    	
		if(king){
			moveTopRigth(cx,cy,colorElement,activeCircle,arr,colorTopRigth);
		}
	}else if ((checkMove(cx, cy) == "black" && colorElement == "white") || 
			 (checkMove(cx,cy) == "white" && colorElement == "black")){
			var cx_after = Math.floor(cx + sizeRect),
				cy_after = Math.floor(cy - sizeRect);
			
			if ((checkMove(cx_after, cy_after) == "free") &&
				validCoord(cx_after, cy_after)) {
				colorTopRigth = true;
			    moveTopRigth(cx,cy,colorElement,activeCircle,arr,colorTopRigth);
			}	
	}else if (checkMove(cx, cy) == "free" && (colorTopRigth != undefined)) {
			var rect = createActiveRect(cx, cy, colorElement);
	       		rect.classList.add("clearRectUpper");
	        var cx_after = Math.floor(cx + sizeRect),
				cy_after = Math.floor(cy - sizeRect);
				if (checkMove(cx_after, cy_after) != "free" || king) {
					moveTopRigth(cx,cy,colorElement,activeCircle,arr,colorTopRigth);
				}
			moveTopLeft(cx,cy,colorElement,activeCircle,arr);
			moveLowRigth(cx,cy,colorElement,activeCircle,arr);
	}
    return arr;
}


function moveLowLeft(cx,cy,colorElement,activeCircle,arr,colorLowLeft){
	cx  = Math.floor(cx - sizeRect), 
	cy  = Math.floor(cy + sizeRect);
	if (!validCoord(cx, cy)) { return }

	var king = activeCircle.classList.contains("king");
	var free = (checkMove(cx, cy) == "free" && 
			   (king || colorElement == "black")) && 
			   (colorLowLeft == undefined);
		   
	if (free) {
		var rect = createActiveRect(cx, cy, colorElement);
	        rect.classList.add("clearUsual");
		if(king){
			moveLowLeft(cx,cy,colorElement,activeCircle,arr,colorLowLeft);
		}
	}else if ((checkMove(cx, cy) == "black" && colorElement == "white")  || 
			 (checkMove(cx,cy) == "white" && colorElement == "black")){
			var cx_after = Math.floor(cx - sizeRect),
				cy_after = Math.floor(cy + sizeRect);
				if(checkMove(cx_after, cy_after) == "free") {
					colorLowLeft = true;
		        	moveLowLeft(cx,cy,colorElement,activeCircle,arr,colorLowLeft);
				}	
	}else if (checkMove(cx, cy) == "free" && (colorLowLeft != undefined)){
				var rect = createActiveRect(cx, cy, colorElement);
			        rect.classList.add("clearRectUpper");
				var cx_after = Math.floor(cx - sizeRect),
					cy_after = Math.floor(cy + sizeRect);
					if(checkMove(cx_after, cy_after) != "free" || king) {
						colorLowLeft = true;
			        	moveLowLeft(cx,cy,colorElement,activeCircle,arr,colorLowLeft);
					}	
				moveTopLeft(cx,cy,colorElement,activeCircle,arr);
        		moveLowRigth(cx,cy,colorElement,activeCircle,arr);
	}
	return arr;
}


function moveLowRigth(cx,cy,colorElement,activeCircle,arr,colorLowRight){
	cx  = Math.floor(cx + sizeRect), 
	cy    = Math.floor(cy + sizeRect);
	if (!validCoord(cx, cy)) { return }

	var king = activeCircle.classList.contains("king");
	var free = (checkMove(cx, cy) == "free" && 
			   (king || colorElement == "black")) && 
			   (colorLowRight == undefined);
		   
	if (free) {
		var rect = createActiveRect(cx, cy, colorElement);
        	rect.classList.add("clearUsual");
		if (king) {
			moveLowRigth(cx,cy,colorElement,activeCircle,arr,colorLowRight);
		}
	}else if ((checkMove(cx, cy) == "black" && colorElement == "white") || 
			 (checkMove(cx,cy) == "white" && colorElement == "black")) {
			var cx_after = Math.floor(cx + sizeRect),
				cy_after = Math.floor(cy + sizeRect);

				if (checkMove(cx_after, cy_after) == "free") {
					colorLowRight = true;
		        	moveLowRigth(cx,cy,colorElement,activeCircle,arr,colorLowRight);
				}
	}else if (checkMove(cx, cy) == "free" && (colorLowRight != undefined)){
			var rect = createActiveRect(cx, cy, colorElement);
		        rect.classList.add("clearRectUpper");
        	var cx_after = Math.floor(cx + sizeRect),
				cy_after = Math.floor(cy + sizeRect);
				if(checkMove(cx_after, cy_after) != "free" || king) {
					moveLowRigth(cx,cy,colorElement,activeCircle,arr,colorLowRight);
				}
	}
    return arr;
}