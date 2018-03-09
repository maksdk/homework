class CreateBoardElements extends CreateBoard {
	createRects() {
		let fill, 
			x = 0, 
			y = 0,
			parent = "outerBoard__board__innerBoard",
			classElem = "outerBoard__board__innerBoard--rect";
		for (let j = 0; j < 8; j++) {
			for (let i = 0; i < 8; i++) {
				(j + i) % 2  ?  fill = "#85653E" : fill = "#EDCFA9";
				this.setAttributesRect(classElem, parent, size, size, x, y, fill);
				x += size;
			}
			x = 0;
			y += size;
		}	
  	}
  	createCircles() {
  		let cx = size * 1.5, 
			cy = size / 2,
			fill = "#565455",
			stroke = "#3C3B3B",
			colorClass = "black",
			parent = "outerBoard__board__innerBoard";
		for (let j = 0; j < 6; j++) {
			for (let i = 0; i < 4; i++) {
				this.setAttributesCircle(colorClass, parent, cx, cy, size/3, fill, stroke);
				this.setAttributesCircle(colorClass, parent, cx, cy, size/5, fill, stroke);
				cx += size * 2;
			}
			if (j == 2) {
				cy = size * 5.5;
				cx = size/2;
				fill = "#D4E2CB";
				stroke = "#F8FFEE";
				colorClass = "white";
			}  else if (j % 2) {
				cy += size;
				cx = size * 1.5;
			} else {
				cy += size;
				cx = size/2;
			}
		}
	}
	createBoardCoords() {
		let numbers = [1,2,3,4,5,6,7,8],
			letters = ["a","b","c","d","e","f","g","h"];
		numbers.forEach( (item, index) => {
			let count = item,
				parent = "outerBoard__board",
				classElem = "outerBoard__board--coords";
			this.setAttributesText(classElem, parent, size/5-2, size*count+6, `${item}`);
			this.setAttributesText(classElem, parent, size*8.7-2, size*count+6, `${item}`);
			this.setAttributesText(classElem, parent, size*count-6, size/3, `${letters[index]}`);
			this.setAttributesText(classElem, parent, size*count-6, size*8.8+2, `${letters[index]}`);
		});
	}
	createArrow() {
		let points = `${1},${size*4.2} ${size*0.7},${size*4.2} ${size*0.85},${size*4.5} ${size*0.7},${size*4.8} ${1},${size*4.8} ${1},${size*4.2}`;
		this.setAttributesG("outerBoard", "slowMove", "parentArrow", "displayNone");
		this.setAttributesPolyline("arrow", "parentArrow", points, "#B04632", "#B04632");
		this.setAttributesText("arrow__text1", "parentArrow", 8, size*4.45, "white" , "12");
		this.setAttributesText("arrow__text2", "parentArrow", 8, size*4.7, "move", "12");
	}
	createContainerRoute() {
		this.setAttributesG("outerBoard__board__innerBoard", "routeParent");
	}
	createContainerActiveRect() {
		this.setAttributesG("outerBoard__board__innerBoard", "activeRectParent");
	}
	createContainerHigherZindex() {
		this.setAttributesG("outerBoard__board__innerBoard", "higherZindex");
	}
}

let elementsBoard = new CreateBoardElements;
	elementsBoard.createBoardCoords();
	elementsBoard.createRects();
	elementsBoard.createCircles();
	elementsBoard.createArrow();
	elementsBoard.createContainerRoute();
	elementsBoard.createContainerActiveRect();
	elementsBoard.createContainerHigherZindex();
		