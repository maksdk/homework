//events for inBlock
let id;
let height;
let dragStart = (e) =>{
	height = e.target.clientHeight;
	id = e.target.id;
	e.dataTransfer.setData("text",e.target.id);
}
//events for outBlock
let dragEnter = (e) =>{
	if(id != e.target.id && e.target.className == "inBlock") {
		console.log(e);
			e.target.style.transform = "translate(0, -" + height + "px)";
	}else {
		
	}
}
let dragLeave = (e) =>{
}
let dragOver = (e) =>{
	e.preventDefault();
}
let dragDrop = (e) =>{
	e.preventDefault();
	e.stopPropagation();
	var id = e.dataTransfer.getData("text");
	var elem = document.getElementById(id);
	e.target.appendChild(elem);
}

let inBlock = document.querySelectorAll(".inBlock"),
	outBlock = document.querySelectorAll(".outBlock");

inBlock.forEach((item) => {
	item.setAttribute('draggable', 'true');
    item.addEventListener('dragstart', dragStart, false);
});

outBlock.forEach((item) => {
	item.addEventListener('dragenter', dragEnter, false);
    item.addEventListener('dragleave', dragLeave, false);
    item.addEventListener('dragover', dragOver, false);
    item.addEventListener('drop', dragDrop, false);
});
