function clickCircle(e) {
	if (this.classList.contains('lastMoved')) return;
	
	let cx = Math.floor(this.getAttribute( "cx")),
		cy = Math.floor(this.getAttribute( "cy"));
	
	searchMove(this, cx, cy);
}