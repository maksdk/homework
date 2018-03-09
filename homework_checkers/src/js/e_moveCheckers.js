class MoveChecker extends Game {
	constructor(elem) {
		super();
		this.x_end = elem.getAttribute( "x");
		this.y_end = elem.getAttribute( "y");
		this.cx_end = +this.x_end + size/2;
		this.cy_end = +this.y_end + size/2;
		this.activeCircle = document.querySelectorAll('.active');
		this.colorDelete = element.color == "white" ? "black" : "white";
		this.index = 0;
		this.route;
		this.deleteCircles;
		this.endGame;
		this.scale;
		this.cy_deleted;
	}

	setFinalRoute() {
		let route = element.coordsMove.filter(elem => {
			for (var i = elem.length - 1; i >= 0; i--) {
				if (elem[i].cx == this.cx_end &&
					elem[i].cy == this.cy_end) {
					return elem;
				}
			}
		});
		this.route = route[0];
		this.route.splice(0, 1);
		return this.route;
	}
	
	startMove(){
		let flag = this.route[this.index].flag,
			cx = this.route[this.index].cx,
			cy = this.route[this.index].cy,
			stop = !this.stopMove(),
			that = this;

		if (flag === "move" || flag === "simpleMove") {
			this.move(cx, cy);
			this.checkQueen(cy);
		} else if (flag === "delete") {
			this.getdeleteCircles();
			this.getScale();
			this.endGame = this.scale == 22 ? true : false;
			this.getCyDeletedCircle();

			this.deleteCircles.forEach( elem => {
				let cx_elem = elem.getAttribute("cx"),
					cy_elem = elem.getAttribute("cy");
				
				if (cx == cx_elem && cy == cy_elem) {
					elem.classList.remove(`${this.colorDelete}`);
					
					let deleteColor = this.colorDelete;
					
					setTimeout(function(){
						that.createCloneDeletedCircle(deleteColor, elem);
					}, 600);

					setTimeout(function(){
						that.deleteElem(elem);
					},350);
					
					this.endGame && setTimeout(function(){
						that.gameOver();
					}, 900); 
				}
			});
		}
		
		if (++this.index < this.route.length && stop) {
			setTimeout(function(){
				that.startMove();
			}, 180);
		} else {
			this.removeElement("activeRect");
			this.removeElement("route__polyline");
			this.removeElement("routeCircle");
			this.removeClass("delete");
			this.removeClass("active");
			this.removeClass("lastMoved");
			this.addClassLastMoved(element.color) ;
			this.moveArrow(this.colorDelete);
		}
	}

	move(cx, cy) {
		[...this.activeCircle].forEach( child => {
			child.setAttribute("cx", cx);
			child.setAttribute("cy", cy);
		});
	}

	deleteElem (elem){
		elem.setAttribute("cx", size * 9);
		elem.setAttribute("cy", this.cy_delete);
	}

	checkQueen(cy) {
		let queen = (cy == size / 2 && element.color === "white") ||
					(cy == size * 7.5 && element.color === "black");	
		if (queen) {
			this.createQueen();
		}	
	}

	getdeleteCircles() {
		this.deleteCircles = [...document.querySelectorAll('.delete')];
	}

	getScale() {
		this.scale = 24 - document.querySelectorAll(`.${this.colorDelete}`).length;
		this.scale % 2 && --this.scale;
	}

	getCyDeletedCircle() {
		if (this.colorDelete === "black") {
			this.cy_delete = size*7.5 - size/5 * this.scale/2;
		} else {
			this.cy_delete = size/2 + size/5 * this.scale/2;
		}
	}

	stopMove() {
		let stop = this.route[this.index].cx == this.cx_end && 
			this.route[this.index].cy == this.cy_end;
		return  stop;
	}
}

function clickRect(e) {
	let moveChecker = new MoveChecker(this);
		moveChecker.setFinalRoute();
		moveChecker.startMove();
}