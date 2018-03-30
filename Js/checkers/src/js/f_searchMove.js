class DrawRoute  extends CreateBoard {
	constructor(cx, cy, color, queen) {
		super();
		this.simpleMoveCoords = [];
	}

	drawRouteCircles(cx, cy, fill, stroke, strokeWidth) {
		this.setAttributesCircle("routeCircle", "routeParent", cx, cy, size/7, fill, stroke, 1);
		this.element.classList.remove("slowMove");
		this.element.removeEventListener("click", clickCircle, false);
	}

	drawRoutePolylines(points, stroke){
		this.setAttributesPolyline("route__polyline", "routeParent", points, stroke);
	}

	drawRouteRect(x, y, stroke) {
		this.setAttributesRect("activeRect", "activeRectParent", size, size, x, y, "#B04632", stroke, 3);
		this.element.addEventListener("click", clickRect, false); 
	}

	findAndSortCoords(cx, cy, color, queen) {
		["topLeft", "topRigth", "lowLeft", "lowRigth"].forEach( route => {
		let [move, remove, simpleMove] = findCoords(cx, cy, color, route, queen, true);
			if (element.specialRemove.length) {
				remove = element.specialRemove;
				move = element.specialMove;
				element.specialRemove = [];
				element.specialMove = [];
			}
			if (remove.length) { 
				sortCoords(remove, move, 0, 0, 0);
			} else if (simpleMove.length) {
				this.simpleMoveCoords.push(simpleMove);
			}
		});
	}

	setSimpleMoveCoords() {
		if (!element.coordsMove.length) {
			this.simpleMoveCoords.forEach( item => {
				element.coordsMove.push(item);
			});
		}
	}

	drawElementsRoute() {
		let stroke = element.elem.getAttribute("stroke");
		 	
		element.coordsMove.forEach( elem => {
			let pointsLine = [];

	 		elem.forEach( item => {
				pointsLine.push(`${item.cx},${item.cy}`);
				if (item.flag == "move") {
					this.drawRouteCircles(item.cx, item.cy, stroke, stroke);
				}
			});

			let points = pointsLine.join(" ");
				this.drawRoutePolylines(points, stroke);

		 	for (var i = elem.length - 1; i > 0; i--) {
				if (elem[i].flag === "delete") break;
				let x = elem[i].cx - size/2,
					y = elem[i].cy - size/2;
					this.drawRouteRect(x, y, stroke)
			}
		});
	}
}

function searchMove(cx, cy, color, queen){
	element.coordsMove = [];
	
	let drawRoute = new DrawRoute;
		drawRoute.findAndSortCoords(cx, cy, color, queen);
		drawRoute.setSimpleMoveCoords();
		drawRoute.drawElementsRoute();
}