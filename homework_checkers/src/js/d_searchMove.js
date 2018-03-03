function searchMove(){
	let simpleMoveCoords = [];
	let{cx, cy, color, queen} = element;
	element.coordsMove = [];
	
	//поиск и сортировка координат
	["topLeft", "topRigth", "lowLeft", "lowRigth"].forEach( route => {
		let [move, remove, simpleMove] = findCoords(cx, cy, color, route, queen);
		if (remove.length) { 
			sortCoords(remove, move, 0, 0, 0);
		} else if (simpleMove.length) {
			simpleMoveCoords.push(simpleMove);
		}
	});

	if (element.coordsMove.length) {
		element.coordsMove.forEach( elem => {
			//отрисовка polylines
			let stroke = element.elem.getAttribute("stroke");
	 		let pointsLine = [];
			elem.forEach( item => {
				pointsLine.push(`${item.cx},${item.cy}`);
				if (item.flag == "move") {
					let verySmallCircle = new Create("circle", verySmallCircleParent, null, null, item.cx, item.cy, stroke, 1, stroke ).setAttributesVerySmallCircle("verySmallCircle");
				}
	 		});
	 		let points = pointsLine.join(" ");
			let polyline = new Create("polyline", polylineParent).setAttributesPolyline(points, stroke, "polyline");
			
			//отрисовка active rect
			for (var i = elem.length - 1; i > 0; i--) {
				if (elem[i].flag === "delete") {
					break;
				} else {
					let x = elem[i].cx - size/2,
						y = elem[i].cy - size/2;
					let rect = new Create("rect", innerBoard, size, size, x, y, "#B04632", 3, stroke).setAttributesRect("activeRect");
					rect.addEventListener("click", clickRect, false);
				}
			}
		});
	 } else if (simpleMoveCoords.length) {
		simpleMoveCoords.forEach( elem  => {
	 		let stroke = element.elem.getAttribute("stroke");
	 		let pointsLine = [];
	 		element.coordsMove.push(elem);
	 		//отрисовка active rect
			elem.forEach( elem => {
				pointsLine.push(`${elem.cx},${elem.cy}`);
				if (elem.flag === "simpleMove") {
					let x = elem.cx - size/2,
							y = elem.cy - size/2;
					let rect = new Create("rect", innerBoard, size, size, x, y, "#B04632", 3, stroke).setAttributesRect("activeRect");
					rect.addEventListener("click", clickRect, false);
				}
	 		});

	 		//отрисовка polylines
			let points = pointsLine.join(" ");
			let polyline = new Create("polyline", polylineParent).setAttributesPolyline(points, stroke, "polyline");
			console.log(document.querySelectorAll('.clone'))
		});
	}
	console.log(document.querySelectorAll('.clone'))
	addHigherZindex();
	console.log(document.querySelectorAll('.clone'))
}