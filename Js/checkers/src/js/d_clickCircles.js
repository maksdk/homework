let element = {
	specialMove: [],
	specialRemove: [],
	simpleMove : []
};

function clickCircle(e) {
	if (this.classList.contains('lastMoved')) return;
	
	element.elem = this;
	element.color = this.classList.contains('white') ? "white" : "black";

	let cx = this.getAttribute("cx"),
		cy = this.getAttribute("cy"),
		queen = this.classList.contains('queen') ? true : false;

	let game = new Game;
		game.removeElement("activeRect");
		game.removeElement("route__polyline");
		game.removeElement("routeCircle");
		game.removeElement("higherZindex--circle");
		game.removeClass("delete");
		game.removeClass("active");
		game.moveArrow(element.color);
		game.addClassActive(cx, cy, element.color);
		game.addHigherZindex();
	
	searchMove(cx, cy, element.color, queen);
}