window.onload = () => {
	let dragObj = {};
	let addList	= document.getElementById("addList");
	addList.onclick = (e)=>{
		let addName = document.getElementById("addName");
			addName.style.display = "block";
			addList.style.display = "none";
		let save = document.getElementById("saveList");
			save.addEventListener("click", saveList, false);
		let cancel = document.getElementById("cancelList");
			cancel.addEventListener("click", cancelAddList, false);
			document.getElementById("nameList").focus();
	}
	let saveList = (e)=>{
		let columns = document.getElementById("columns"),
			nameList = document.getElementById("nameList"),
			parentOutBlock = document.createElement("div"),
			outBlock = document.createElement("div"),
			outBlockTitle = document.createElement("div"),
			addCard = document.createElement("div");

		parentOutBlock.classList.add("parentOutBlock");
		columns.insertBefore(parentOutBlock, columns.children[columns.children.length - 1]);

		outBlock.classList.add("outBlock");
		outBlock.setAttribute('draggable', 'true');
		outBlock.addEventListener('dragenter', dragEnterOutBlock, false);
		parentOutBlock.appendChild(outBlock);
		
		outBlockTitle.classList.add("outBlockTitle");
		outBlockTitle.innerText = nameList.value;
		outBlockTitle.setAttribute('draggable', 'true');
 		outBlockTitle.addEventListener('dragstart', dragStart, false);
 		outBlockTitle.addEventListener('dragenter', dragEnterTitle, false);
    	outBlockTitle.addEventListener('dragend', dragEnd, false);
    	//outBlockTitle.addEventListener('drag', drag, false);
    	outBlock.appendChild(outBlockTitle);
		
		addCard.classList.add("addCard");
		addCard.id = "addCard";
		addCard.innerText = "Добавить карточку...";
		addCard.style.display = "flex";

		addCard.addEventListener("click", addCardInList, false);
		outBlock.appendChild(addCard);

		nameList.value = null;
		addName.style.display = "none";
		addList.style.display = "block";
	}

	let  cancelAddList = (e)=>{
		let addName = document.getElementById("addName");
		addName.style.display = "none";
		addList.style.display = "block";
	}
	let addCardInList = (e)=>{
		let parentInBlock = document.createElement("div"),
			inBlock = document.createElement("div"),
		    textArea = document.createElement("textArea"),
		    buttonsDiv = document.createElement("div"),
		    buttonAdd = document.createElement("button"),
		    buttonCancel = document.createElement("button");
		    
	    //вставляем перед кнопкой добавить список
	    parentInBlock.classList.add("parentInBlock");
	    let index = e.target.parentNode.children.length - 1;
	    e.target.parentNode.insertBefore(parentInBlock, e.target.parentNode.children[index]);
	
	    inBlock.classList.add("inBlock");
		inBlock.style.padding = "0";
		inBlock.style.backgroundColor = "#E2E4E6";
		parentInBlock.appendChild(inBlock);
		inBlock.setAttribute('draggable', 'true');
 		inBlock.addEventListener('dragstart', dragStart, false);
 		inBlock.addEventListener('dragenter', dragEnterInBlock, false);
    	inBlock.addEventListener('dragend', dragEnd, false);
    	//inBlock.addEventListener('drag', drag, false);
	
		textArea.classList.add("textArea");
		textArea.id = "textareaAddCard";
		inBlock.appendChild(textArea);
		document.getElementById("textareaAddCard").focus();
		//textArea.addEventListener("blur", loseFocusTextarea, false);

		buttonsDiv.classList.add("buttonsAddCard");
		buttonsDiv.id = "buttonsAddCardId";
		e.target.parentNode.appendChild(buttonsDiv);

		buttonAdd.classList.add("buttonsAddCard--add");
		buttonAdd.innerText = "Добавить";
		buttonAdd.addEventListener("click", saveCardInList, false);
		buttonsDiv.appendChild(buttonAdd);

		buttonCancel.classList.add("buttonsAddCard--cancel");
		buttonCancel.innerText = "Отмена";
		buttonCancel.addEventListener("click", cancelAddCardInLIst, false);
		buttonsDiv.appendChild(buttonCancel);

		e.target.style.display = "none";
	}

	let saveCardInList = (e)=>{
		let textarea = document.getElementById("textareaAddCard");
		textarea.parentNode.setAttribute("style", "padding: 10px; background-color: #ffffff; width:160px;");
		e.target.parentNode.previousSibling.style.display = "block";
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		textarea.parentNode.innerHTML = textarea.value;
	}

	let cancelAddCardInLIst = (e)=>{
		let textarea = document.getElementById("textareaAddCard");
		let parent = textarea.parentNode.parentNode.parentNode;
		parent.removeChild(document.getElementById("buttonsAddCardId"));
		
		let index = textarea.parentNode.parentNode.parentNode.children.length;
		parent.children[index - 1].style.display = "block";
		parent.removeChild(textarea.parentNode.parentNode);
		textarea.parentNode.removeChild(textarea);
	}
	let loseFocusTextarea = (e)=>{
	}	
	let dragStart = (e) =>{
		let eTarget, parent, deltaCoords;
		if(e.target.className == "outBlockTitle"){
	 		parent = e.target.parentNode.parentNode;
	 		eTarget = e.target.parentNode;
	 	} else if(e.target.className == "inBlock") {
			parent = e.target.parentNode;
	 		eTarget = e.target;
	 	}
	 	parent.style.height = parent.clientHeight - 1 + "px";
		
		let clone = parent.cloneNode(true);
	 	document.body.appendChild(clone);
		clone.id = "clone";
		clone.style.position = "absolute";    
		clone.style.top = "-1000px";
		clone.style.zIndex = "-100";
		 
		let coords = getCoords(e.target);
		let deltaX = e.pageX - coords.left - 30,
		    deltaY = e.pageY - coords.top;
		e.dataTransfer.setDragImage(clone, deltaX, deltaY); 
		dragObj.elem = e.target;
		dragObj.parent = parent;
		dragObj.style = eTarget.getAttribute("style");
		dragObj.deltaX = deltaX;
		dragObj.deltaY = deltaY;

		eTarget.style.zIndex = 9999;
	 	eTarget.style.position = 'absolute';
	 	eTarget.style.opacity = "0";
	 	
	}
	let dragEnterInBlock = (e) =>{
		if (e.target === dragObj.elem){return}
		if (dragObj.elem.className == "outBlockTitle"){return}
		let coord = getCoords(e.target);
		if(Math.abs(coord.top - e.pageY) > 15){
			if(e.target.parentNode.nextElementSibling.className != "inBlock" && 
				e.target.parentNode.nextElementSibling.className != "parentInBlock"){
				e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode.nextElementSibling);
			} else {
				e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode);
			}
		} else if (Math.abs(coord.top - e.pageY) <= 15){
			if (e.target.parentNode.parentNode.children[1] === e.target.parentNode){
				e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode);
			} else {
				e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode.nextElementSibling);
			}
		}
	}
	let dragEnterOutBlock = (e)=>{
		if(e.target.className == "addCard"){return}
		if(dragObj.elem == undefined){return}
		if((e.target.className == "outBlockTitle" || 
			e.target.className == "outBlock") &&
			dragObj.elem.className == "outBlockTitle"&&
			dragObj.elem !== e.target &&
			dragObj.elem.parentNode !== e.target){
			let coord = getCoords(e.target);
			if (Math.abs(coord.left - e.pageX) > 100){
				if (e.target.className == "outBlockTitle"){
					e.target.parentNode.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode.parentNode);
				} else if (dragObj.parent === e.target.parentNode.nextElementSibling){
					e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode);
				}	else {
					e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode.nextElementSibling);
				}
			}else if (Math.abs(coord.left - e.pageX) < 100) {
				if (e.target.className == "outBlockTitle"){
					e.target.parentNode.parentNode.parentNode.insertBefore(e.target.parentNode.parentNode, dragObj.parent);
				} else if((dragObj.parent === e.target.parentNode.nextElementSibling)){
					e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode);
				} else {
					e.target.parentNode.parentNode.insertBefore(dragObj.parent, e.target.parentNode.nextElementSibling);
				}
			}
		} else {return;}
	}
	let dragEnterTitle = (e) => {
		if (dragObj.elem.className != "inBlock"){return}
		if (e.target.parentNode.childElementCount > 2 ) {return}
		e.target.parentNode.insertBefore(dragObj.parent, e.target.parentNode.children[1]);
	}
	let  getCoords = (elem) => { 
	  var box = elem.getBoundingClientRect();
		return {
	    top: box.top + pageYOffset,
	    left: box.left + pageXOffset
	  };
	}
	let dragEnd = (e) =>{
		e.target.className == "outBlockTitle" ?
		e.target.parentNode.setAttribute("style", dragObj.style) :
		e.target.setAttribute("style", dragObj.style);
		dragObj.parent.style.height = "100%";
		let clone = document.getElementById("clone");
		document.body.removeChild(clone);
	}
	// let drag = (e)=>{
	// 	console.log(e.target.parentNode)
	// 	if(e.target.className == "outBlockTitle"){
	// 		e.target.parentNode.style.opacity = "0";
	// 	} else {
	// 		e.target.style.opacity = "0";
	// 	}
		
	// }
}