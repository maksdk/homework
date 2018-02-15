window.onload = () => {
	let dragObj = {};
	let img = new Image;
	let elem = document.createElement("div");
		elem.style.display = "none";
		document.body.appendChild(elem);
		
//=========== let mousedown  = (e) => {
	// 	if (e.which != 1 || (e.target.className != "inBlock" && 
	// 		e.target.className != "outBlock")){console.log("return");return}
	// 		e.target.setAttribute("draggable", "false");
		
	// 	let parent = e.target.parentNode;
	// 		parent.style.height = e.target.clientHeight + "px";
	// 	let elementToDrag = e.target;
		
	// 	// координаты мыши в начале перетаскивания.
	// 	let startX = e.clientX,
	// 	    startY = e.clientY;
		   
	// 	// начальные координаты элемента, который будет перемещаться.
	// 	let origX = e.target.offsetLeft,
	// 	    origY = e.target.offsetTop;
		   
	// 	// разница между координатами мыши и координатами перетаскиваемого элемента.
	// 	let deltaX = startX - origX,
	// 	    deltaY = startY - origY;
		
	// 	dragObj.elem = e.target;
	// 	dragObj.deltaX = deltaX;
	// 	dragObj.deltaY = deltaY;
	// 	dragObj.pageX = e.pageX;
	// 	dragObj.pageY = e.pageY;

	// 	document.addEventListener("mousemove", mousemove, true);
	// 	document.addEventListener("mouseup", mouseup, true);
	// }
	// let mousemove = (e) => {
		
	// 	if ( Math.abs(dragObj.pageX - e.pageX) < 3 && 
	// 		Math.abs(dragObj.pageY - e.pageY) < 3 ) {
	//       return; // ничего не делать, мышь не передвинулась достаточно далеко
	//     }
	//     if (dragObj.elem != document.body) {
			
	//   		document.body.appendChild(dragObj.elem); // переместить в BODY, если надо
	//     	dragObj.elem.style.zIndex = 9999; // сделать, чтобы элемент был над другими
	// 		dragObj.elem.style.position = 'absolute';
	// 	 }
	// 	dragObj.elem.style.left = (e.clientX - dragObj.deltaX) + 10 + "px";
	//     dragObj.elem.style.top = (e.clientY - dragObj.deltaY) + 10 + "px";
	// }
	// let mouseup = (e) => {
	// 	document.removeEventListener("mouseup", mouseup, true);
	// 	document.removeEventListener("mousemove", mousemove, true);
	// }
	// let mouseover = (e)=>{
	// 	console.log(e)
	// }

	// document.onmousemove  = (e) => {
	// 	if(!dragObj.elem) {return}
	// 	if (dragObj.elem != document.body) {
	  		
	//   		var coords = getCoords(dragObj.elem);
	//     		dragObj.shiftX = dragObj.startX - coords.left;
	//     		dragObj.shiftY = dragObj.startY - coords.top;

	//     		document.body.appendChild(dragObj.elem); // переместить в BODY, если надо
	//     		dragObj.elem.style.zIndex = 9999; // сделать, чтобы элемент был над другими
	// 			dragObj.elem.style.position = 'absolute';
	// 	}
	//  	dragObj.elem.style.left = e.pageX - dragObj.shiftX + 'px';
	//  	dragObj.elem.style.top = e.pageY - dragObj.shiftY + 'px';

	//   return false;
	    
	// }
	// let getCoords = (elem) => {
	// 	let box = elem.getBoundingClientRect();
	// 	return {
	//     	top: box.top + pageYOffset,
	//     	left: box.left + pageXOffset
	//   	};
	// }
	// let elemMove;
	// let id;
	// let parent;
	// let darkBg = document.getElementById("darkBg");
	//let outBlock1 = document.getElementById("outBlock1");
	
	
	//document.addEventListener("mousemove", mousemove, true);
//============================================================	

	let dragStart = (e) =>{
		let parent = e.target.parentNode;
	 		parent.style.height = e.target.clientHeight - 1 + "px";
		
		// разница между координатами мыши и координатами перетаскиваемого элемента.
		let coords = getCoords(e.target);
		let deltaX = e.pageX - coords.left,
		    deltaY = e.pageY - coords.top;

		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData("text", e.target.id);
		e.dataTransfer.setDragImage(img, deltaX, deltaY);    	
		
		//обьект dragObj
		dragObj.elem = e.target;
		dragObj.elemChild = e.target.firstElementChild;
		dragObj.parent = e.target.parentNode;
		dragObj.style = e.target.getAttribute("style");
		dragObj.deltaX = deltaX;
		dragObj.deltaY = deltaY;

		e.target.style.zIndex = 9999;
	 	e.target.style.position = 'absolute';
	 	e.target.style.opacity = "0";
	}
	let dragEnter = (e) =>{
		// if (e.target === dragObj.elem){return}
		// let coord = getCoords(e.target);
		// if(Math.abs (coord.top - e.pageY) > 15){
		// 	e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode);
		// } else if (Math.abs (coord.top - e.pageY) <= 15){
		// 	e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode.nextElementSibling);
		// }
	}

	let  getCoords = (elem) => { 
	  var box = elem.getBoundingClientRect();
		return {
	    top: box.top + pageYOffset,
	    left: box.left + pageXOffset
	  };
	}
	let dragEnd = (e) =>{
		e.target.setAttribute("style", dragObj.style);
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

	let mouseover = (e) =>{
		if(e.target.className != "inBlock" && 
			e.target.className != "outBlockTitle"){return}
		screen(e.target);
	}

	let dragStartOutBlock = (e)=>{
		
		console.log(e.target.parentNode.clientHeight)
		console.log(e.target.parentNode.clientWidth)
		let parentNode = e.target.parentNode.cloneNode(true) ;
		elem.appendChild(parentNode);
		

		// разница между координатами мыши и координатами перетаскиваемого элемента.
		let coords = getCoords(e.target);
		let deltaX = e.pageX - coords.left,
		    deltaY = e.pageY - coords.top;
		
		elem.style.display = "block";
		elem.style.position = "absolute";    
		elem.style.left = "0";
		elem.style.top = "-1000px";
		//elem.style.height = e.target.parentNode.clientHeight + "px";
		//elem.style.width = e.target.parentNode.clientWidth + "px";
		//elem.style.border = "2px solid red";
		elem.style.zIndex = "-100";
		elem.style.opacity = "1";
		

		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData("text", e.target.id);
		e.dataTransfer.setDragImage(parentNode, deltaX, deltaY); 
		e.target.parentNode.style.opacity = "0";
	}
	let dragEnterOutBlock = (e)=>{
		console.log(e)
	}
	let dragEndOutBlock = (e)=>{

	}
	let dragOutBlock = (e)=>{
		//console.log(e)
		elem.style.left = e.pageX - dragObj.deltaX + "px";
		elem.style.top = e.pageY - dragObj.deltaY +  "px";
	}
	let inBlock = document.querySelectorAll(".inBlock"),
		outBlock = document.querySelectorAll(".outBlock"),
		outBlockTitle = document.querySelectorAll(".outBlockTitle");

		

	inBlock.forEach((item) => {
		item.setAttribute('draggable', 'true');
	 	item.addEventListener('dragstart', dragStart, false);
	 	//item.addEventListener('drag', drag, false);
	   // item.addEventListener('mousedown', mousedown, false);
	   item.addEventListener('mouseover', mouseover, false);
	    item.addEventListener('dragenter', dragEnter, false);
	    item.addEventListener('dragend', dragEnd, false);
	});
	outBlockTitle.forEach((item) => {
		item.setAttribute('draggable', 'true');
	 	item.addEventListener('dragstart', dragStartOutBlock, false);
	 	item.addEventListener('drag', dragOutBlock, false);
	   // item.addEventListener('mousedown', mousedown, false);
	   item.addEventListener('mouseover', mouseover, false);
	    item.addEventListener('dragenter', dragEnterOutBlock, false);
	    item.addEventListener('dragend', dragEndOutBlock, false);
	});

	window.screen = function(elem){
		html2canvas(elem, {
    	onrendered: function (canvas) {
    			dragObj.img = canvas;
    			img.src = canvas.toDataURL("image/jpeg");
    			}
		});
	}
	

    
    
	
	// outBlock.forEach((item) => {
	// 	item.addEventListener('dragenter', dragEnter, true);
	//     item.addEventListener('dragleave', dragLeave, false);
	//     item.addEventListener('dragover', dragOver, false);
	//     item.addEventListener('drop', dragDrop, false);
	// });

}