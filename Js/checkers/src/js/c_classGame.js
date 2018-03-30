class Game {
	removeElement(classElem) {
		let element = document.querySelectorAll(`.${classElem}`);
		[...element].forEach( item => {
			item.parentNode.removeChild(item);
		});
	}
	removeClass(classElem) {
		let classDelete = document.querySelectorAll(`.${classElem}`);
		[...classDelete].forEach( item => {
			item.classList.remove(classElem);
		});
	}
	addClassLastMoved(color) {
		let circles = document.getElementsByClassName(`${color}`);
		[...circles].forEach( item => {
			item.classList.add("lastMoved");
		});
	}
	addClassActive(cx_active, cy_active, color) {
		let circles = document.getElementsByClassName(`${color}`);
		[...circles].forEach (item => {
			let cx = item.getAttribute("cx"),
				cy = item.getAttribute("cy");
			if (cx == cx_active && cy == cy_active) {
				item.classList.add("active");
			}
		});
	}
	addHigherZindex() {
		let zIndex = document.querySelector('.higherZindex');
		let active = document.querySelectorAll('.active');
		[...active].forEach ( elem => {
			let clone = elem.cloneNode(true);
			clone.classList.add("higherZindex--circle");
			zIndex.appendChild(clone);
		});
	}
	createQueen() {
		let activeQueen = document.querySelectorAll('.active');
		[...activeQueen].forEach(item => {
			let r = item.getAttribute("r");
			if (+r == size/5) {
				item.parentNode.removeChild(item);
			} else {
				item.classList.add("queen");
			}
		});
	}
	createCloneDeletedCircle(colorDelete, elem){
		let board = document.querySelector('.outerBoard__board__innerBoard'),
			clone = elem.cloneNode(true);
		clone.classList.add(`cloneDelete${colorDelete}`);
		board.appendChild(clone);
	}
	moveArrow(color) {
		let parentArrow = document.querySelector('.parentArrow'),
			text1 =document.querySelector('.arrow__text1'), 
			text2 =document.querySelector('.arrow__text2');

		if (color == "white") {
			parentArrow.setAttribute("style", `transform: translate(0, ${size*2}px)`);
		} else {
			parentArrow.setAttribute("style", `transform: translate(0, -${size*2}px)`);
		}
		parentArrow.classList.remove("displayNone");
		parentArrow.classList.remove("displayNone");
		text1.setAttribute("fill", `${color}`);
		text2.setAttribute("fill", `${color}`);
		text1.innerHTML = color;
	}
	gameOver() {
		let color = element.color[0].toUpperCase() + element.color.slice(1),
			text = document.querySelector(".popup__content--text");
			text.innerHTML = `${color} won!`
		
		let button = document.querySelector(".popup__content--btn");
			button.addEventListener("click", function(e){
				window.location.reload();
			}, false);
		
		let popup = document.querySelector(".popup");	
			popup.classList.remove("displayNone")
	}
}
