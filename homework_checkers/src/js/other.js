/*
 * add class
 */
function addClassDelete(cx, cy){
	for (var i = 0; i < circle.length; i++) {
		if (circle[i].getAttribute("cx") == cx &&
			circle[i].getAttribute("cy") == cy){
			circle[i].classList.add('delete');
		}
	}
}

/*
 * check valid coordinates
 */
 var validCoord = (cx, cy) => {
	return ((0 <= cx && cx <= sizeRect*8) && 
			(0 <= cy && cy <= sizeRect*8)) ? true : false
}