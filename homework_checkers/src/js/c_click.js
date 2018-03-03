let element = {};

function clickCircle(e) {
	if (this.classList.contains('lastMoved')) return;

	if (verySmallCircleParent.children.length) removeVerySmallCircle();
	
	element.elem = this;
	element.parent = this.parentNode;
	element.cx = this.getAttribute("cx");
	element.cy = this.getAttribute("cy");
	element.color = this.classList.contains('white') ? "white" : "black";
	element.queen = this.classList.contains('queen') ? true : false;

	removeHigherZindex();
	removeClassActive();
	removeActiveRect();
	removePolylines();
	removeClassDelete();

	addClassActive();
	
	moveArrow(element.color);
	searchMove();
}


function clickRect(e) {
	var x_end = this.getAttribute( "x"),
		  y_end = this.getAttribute( "y");
	var	cx_end = +x_end + size/2,
		  cy_end = +y_end + size/2;
	
	let route = setFinalRoute(cx_end, cy_end);
	getMoved(route, cx_end, cy_end);
}


function setFinalRoute(cx_end, cy_end) {
	let route = element.coordsMove.filter(elem => {
		for (var i = elem.length - 1; i >= 0; i--) {
				if (elem[i].cx == cx_end &&
						elem[i].cy == cy_end) {
					return elem;
				}
			}
	});

	route = route[0];
	route.splice(0, 1);
	return route;
}


function getMoved(route, cx_end, cy_end) {
	let index = 0;
	let active = document.querySelectorAll('.active');
	move();
	
	function move() {
		if (route[index].flag === "move" || route[index].flag == "simpleMove") {
				[...active].forEach(child => {
					child.setAttribute("cx", route[index].cx);
					child.setAttribute("cy", route[index].cy);
				});
				let queen = (route[index].cy == size / 2 && element.color === "white") ||
						(route[index].cy == size * 7.5 && element.color === "black");	
				if (queen) {
					createQueen();
	      }	
	  } else if (route[index].flag === "delete") {
				let removeCircles = [...document.querySelectorAll('.delete')];
				let colorDelete = element.color == "white" ?  "black" : "white" ;
				let count = 24 - document.querySelectorAll(`.${colorDelete}`).length;
				count % 2 && --count;
				let	cy_delete;
				
				if (colorDelete === "black") {
						cy_delete = size*7.5 - size/5 * count/2;
				} else {
						cy_delete = size/2 + size/5 * count/2;
				}

				removeCircles.forEach( elem => {
					let cx = elem.getAttribute("cx"),
							cy = elem.getAttribute("cy");
					if (route[index].cx == cx && route[index].cy == cy) {
							elem.classList.remove(`${colorDelete}`);
						
						setTimeout(function(){
							moveClone();
						}, 800);
						setTimeout(function(){
							deleteElem ();
						},500);

						function deleteElem (){
							elem.setAttribute("cx", size * 9);
							elem.setAttribute("cy", cy_delete);
							
						}

						function moveClone(){
							let clone = elem.cloneNode(true);
							clone.classList.add(`cloneDelete${colorDelete}`);
							innerBoard.appendChild(clone);
						}
					}
				});
		}
		let exit = route[index].cx == cx_end && route[index].cy == cy_end;
		if (++index < route.length && !exit) {
			setTimeout(function(){
				move();
			}, 180);
			
		} else {
			setTimeout(function(){
				removeHigherZindex();
			}, 500);
					
			removeClassActive();
			removeActiveRect();
			removePolylines();
			removeVerySmallCircle();
			removeClassDelete();

			classLastMoved();
			let color = element.color == "white" ? "black" : "white";
			moveArrow(color);
		}
	}
}




function removeActiveRect() {
	let rect = document.querySelectorAll('.activeRect');
	[...rect].forEach( elem => {
		elem.parentNode.removeChild(elem);
	});
}

function removePolylines() {
	let polilyne = document.querySelector('.polylineParent');
	[...polilyne.children].forEach (elem => {
		polilyne.removeChild(elem);
	});
}

function removeVerySmallCircle() {
	let verySmallCircles = document.querySelector(".verySmallCircleParent");
	[...verySmallCircles.children].forEach( elem => {
		verySmallCircles.removeChild(elem);
	});
}

function removeClassDelete() {
	let classDelete = document.querySelectorAll('.delete');
	[...classDelete].forEach( elem => {
		elem.classList.remove("delete");
	});
}

function classLastMoved() {
	let lastMoved = document.querySelectorAll(".lastMoved");
	if (lastMoved.length) {
		[...lastMoved].forEach( elem => {
			elem.classList.remove("lastMoved");
		});
	}
	
	let circles = document.getElementsByClassName(element.color);
	[...circles].forEach( elem => {
		elem.classList.add("lastMoved");
	});
}

function createQueen(queen) {
	let activeQueen = document.querySelectorAll('.active');
	[...activeQueen].forEach(elem => {
		let r = elem.getAttribute("r");
		if (+r == size/5) {
			elem.parentNode.removeChild(elem);
		} else {
			elem.classList.add("queen");
		}
	});
}

function addClassActive() {
	let circles = document.getElementsByClassName(element.color);
	[...circles].forEach (elem => {
		let cx = elem.getAttribute("cx"),
				cy = elem.getAttribute("cy");
		if (cx == element.cx && cy == element.cy) {
			elem.classList.add("active");
		}
	});
}

	function removeClassActive() {
	let circles = document.querySelectorAll('.active');
	[...circles].forEach (elem => {
		elem.classList.remove("active");
	});
}


function addHigherZindex() {
	let board = document.querySelector('.innerBoard');
	let active = document.querySelectorAll('.active');
	[...active].forEach ( elem => {
		let clone = elem.cloneNode(true);
		console.log("===============")
		console.log("clone")
		console.log(clone)
		clone.classList.add("clone");
		board.appendChild(clone);


		// console.log("active")
		// console.log(active)
		// console.log("board")
		// console.log(board)
	});
	console.log(document.querySelectorAll('.clone'))

}

function removeHigherZindex() {
	let board = document.querySelector('.innerBoard');
	let clone = document.querySelectorAll('.clone');
	[...clone].forEach( elem => {
		board.removeChild(elem);
	});

}

function moveArrow(color) {
	if (color == "white") {
		arrowMoveParent.setAttribute("y", `${size*6.2}`);
	} else {
		arrowMoveParent.setAttribute("y", `${size*2.2}`);
	}
	arrowMoveParent.classList.remove("displayNone");
	arrowMoveParent.classList.add("displayBlock");
	//arrowMoveParent.style.transition = "all 1s ease";
	text1.innerHTML = color;
	text1.setAttribute("fill", `${color}`);
	text2.setAttribute("fill", `${color}`);
}