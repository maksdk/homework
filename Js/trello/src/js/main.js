class CreateElem {
    constructor(classElement, parent, tag, innerText, handler) {
      this.classElement = classElement;
      this.tag = tag || "div";
      this.parent = parent || document.body;
      this.innerText = innerText;
      this.handler = handler;
    }
    create(){
      let elem = document.createElement(this.tag);
      elem.classList.add(this.classElement);
      if (this.innerText !== undefined) { 
        elem.innerText = this.innerText;
      }
      if (this.handler !== undefined) {
        elem.addEventListener("click", this.handler, false);
      }
      this.parent.appendChild(elem);
      return elem;
    }
    dragnDrop(handler, elem, event) {
      elem.addEventListener(event, handler, false);
    }
    setdraggable(elem) {
      elem.setAttribute("draggable", "true");
    }
  }
  
//===== СОЗДАНИЕ СТАРТОВОЙ СТРАНИЦЫ=====
  let container = new CreateElem("container").create(),
    allLists = new CreateElem("allLists", container).create(),
    addList = new CreateElem("addList", container).create(),
    btnAddList = new CreateElem("addList__btnAdd", addList, "button", "Добавить список ...", addListClick).create();
  

//=====ДОБАВЛЕНИЕ СПИСКА=====
  function addListClick(e) {
    this.classList.remove("displayBlock");
    this.classList.add("displayNone");
    
    let inputTitle = new CreateElem("addList__title", addList).create(), 
      input = new CreateElem("addList__title--input", inputTitle, "input").create(),
      save = new CreateElem("addList__title--save", inputTitle, "button", "Сохранить", saveList).create(),
      cancel = new CreateElem("addList__title--cancel", inputTitle, "button", "Отмена", cancelList).create();
      input.focus();
  }

  function saveList(e) {
    let  title = document.querySelector('.addList__title--input').value;

    //создание списка
    let parentList = new CreateElem("parentList", allLists, "div").create();
    let list = new CreateElem("list", parentList, "div"),
        listElem = list.create();
        list.setdraggable(listElem);
        list.dragnDrop(dragEnter, listElem, "dragenter");

    let listTitle = new CreateElem("list__title", listElem, "span", title),
        listTitleElem = listTitle.create();
        listTitle.setdraggable(listTitleElem);
        listTitle.dragnDrop(dragStart, listTitleElem, "dragstart");
        listTitle.dragnDrop(dragEnter, listTitleElem, "dragenter");
        listTitle.dragnDrop(dragEnd, listTitleElem, "dragend");
    let deleteList = new CreateElem("list__title--remove", listTitleElem, "span", undefined, removeList).create();

    let listContent = new CreateElem("list__content", listElem),
        listContentElem = listContent.create();
        listContent.setdraggable(listContentElem);
        listContent.dragnDrop(dragEnter, listContentElem, "dragenter");

    let addCard = new CreateElem("list__addCard", listElem),
        addCardElem = addCard.create();
        addCard.setdraggable(addCardElem);
        addCard.dragnDrop(dragEnter, addCardElem, "dragenter");

    let butAdd = new CreateElem("list__addCard--add", addCardElem, "button", "Добавить карточку...", addCardClick).create();

    addList.removeChild(this.parentNode);
    btnAddList.classList.remove("displayNone");
    btnAddList.classList.add("displayBlock");
  }
 
  function cancelList(e) {
    addList.removeChild(this.parentNode);
    btnAddList.classList.remove("displayNone");
    btnAddList.classList.add("displayBlock");
  }

  function removeList(e) {
    let list = this.parentNode.parentNode.parentNode,
      allLists = this.parentNode.parentNode.parentNode.parentNode;
    allLists.removeChild(list);
  }

//=====ДОБАВЛЕНИЕ КАРТОЧКИ В СПИСОК=====
  function addCardClick(e) {
    this.classList.remove("displayBlock");
    this.classList.add("displayNone");
    
    let inputData = new CreateElem("list__addCard--inputData", this.parentNode).create(),
      textarea = new CreateElem("list__addCard--textarea", inputData, "textarea").create(),
      btnSave = new CreateElem("list__addCard--save", inputData, "button", "Сохранить", saveCard).create(),
      btnCancel = new CreateElem("list__addCard--cancel", inputData, "button", "Отмена", cancelCard).create();
      textarea.focus();
  }

  function saveCard(e) {
    let value = document.querySelector(".list__addCard--textarea").value,
      inputData = this.parentNode,
      btnAdd = this.parentNode.previousElementSibling,
      addCard = this.parentNode.parentNode,
      listContent = this.parentNode.parentNode.previousElementSibling;

    //содаем карточку и добавляем ее в список
    let parentCard = new CreateElem("list__content__parentCard", listContent, "div").create();
    let card =  new CreateElem("list__content__card", parentCard, "div", value),
      cardElem = card.create();
      card.setdraggable(cardElem);
      card.dragnDrop(dragStart, cardElem, "dragstart");
      card.dragnDrop(dragEnter, cardElem, "dragenter");
      card.dragnDrop(dragEnd, cardElem, "dragend");
  let redactIcon =  new CreateElem("list__content__card--redact", cardElem, "span", undefined, redactCard).create();

    btnAdd.classList.remove("displayNone");
    btnAdd.classList.add("displayBlock");
    addCard.removeChild(inputData);
        
  }
  function cancelCard(e) {
    let inputData = this.parentNode,
      btnAdd = this.parentNode.previousElementSibling,
      addCard = this.parentNode.parentNode;
      
      addCard.removeChild(inputData);
      btnAdd.classList.remove("displayNone");
      btnAdd.classList.add("displayBlock");
  }
  //редактирование карточки
  function redactCard(e) {
    let parentCard = this.parentNode.parentNode,
        card = this.parentNode,
        cardValue = this.parentNode.innerText;
        
    card.classList.add("displayNone");

    let redact = new CreateElem("redact", parentCard).create(),
      textarea = new CreateElem("redact__textarea", redact, "textarea").create(),
      btnSave = new CreateElem("redact__btnSaveCard", redact, "button", "Сохранить", redactSaveCard).create(),
      btnCancel = new CreateElem("redact__btnCancelCard", redact, "button", "Отмена", redactCancelCard).create(),
      btnRemoveCard = new CreateElem("redact__btnRemoveCard", redact, "button", "Удалить карточку", removeCard).create();
      
      textarea.value = cardValue;
      textarea.focus();
  }

  function redactSaveCard(e) {
    let value = document.querySelector(".redact__textarea").value,
      card = this.parentNode.previousElementSibling,
      parentCard = this.parentNode.parentNode,
      redactBlock = this.parentNode;

    parentCard.removeChild(redactBlock);

    card.textContent  = value;
    let redactIcon =  new CreateElem("list__content__card--redact", card, "span", undefined, redactCard).create();
    card.classList.remove("displayNone");   

  }

  function redactCancelCard(e) {
    let redact = this.parentNode,
      parentRedact = this.parentNode.parentNode,
      card = this.parentNode.previousElementSibling;

      parentRedact.removeChild(redact);
      card.classList.remove("displayNone");
  }

  function removeCard(e) {
    let card = this.parentNode.parentNode,
      parentCard = this.parentNode.parentNode.parentNode;
    parentCard.removeChild(card);
  }
 
//=====ПЕРЕТАСКИВАНИЕ КАРТОЧКИ И СПИСКА=====
  let dragObj = {};
  function dragStart(e) {
    let elem = this.className === "list__title" ? 
                this.parentNode : this;
    
    //клонируем перетаскиваемый элемент и вешаем его на курсор
    let cloneElem = elem.cloneNode(true);
      cloneElem.classList.add("hiddenCloneElem");
    let coords = getCoords(elem),
        deltaX = e.pageX - coords.left,
        deltaY = e.pageY - coords.top;
    document.body.appendChild(cloneElem);
    e.dataTransfer.setDragImage(cloneElem, deltaX, deltaY);

    //записываем данные об элементе в глобальный обьект
    dragObj.elem = elem;
    dragObj.parent = elem.parentNode;

    elem.classList.add("opacityZero");
  }

  function dragEnter(e) {
    let validEnter;
    if (dragObj.elem && dragObj.elem.classList.contains("list")) {
      //условия переноса листов
      validEnter = !(this.classList.contains("opacityZero")) &&
        !(this.parentNode.classList.contains("opacityZero")) && 
        !(this.parentNode.parentNode.parentNode.classList.contains("opacityZero"));
    
    } else {
      //условие переноса карточки в пустой лист
      validEnter = dragObj.elem &&
          this.parentNode.children[1] &&
          dragObj.elem.classList.contains("list__content__card") &&
          (this.classList.contains("list__title") || 
          this.classList.contains("list__addCard"));
      
      if (validEnter) {
        this.classList.contains("list__addCard") || 
        this.parentNode.children[1].children.length == 0 ?
        this.parentNode.children[1].appendChild(dragObj.parent) :
        this.parentNode.children[1].insertBefore(dragObj.parent, this.parentNode.children[1].children[0]);
        validEnter = false;
        return;
      } 
      
      //условие переноса карточек
      validEnter = dragObj.elem &&
        !(this.classList.contains("opacityZero")) && 
        this.classList.contains("list__content__card") &&
        dragObj.elem.classList.contains("list__content__card");
    }
    
    if (!validEnter) return; 
    
    //находим сторону входа элемента. 
    //если side == true, то элемент двигают из конца контейнера в начало, и наоборот
    let coords = getCoords(this);
    let side = dragObj.elem.classList.contains("list") ? 
              e.pageX - coords.left >= 100 : e.pageY - coords.top >= 10;

    //находим элемент на место которого мы перетаскиваем другой элемент
    let elem = this.parentNode;
    if (dragObj.elem.classList.contains("list")) {
      if (this.classList.contains("list")) {
          elem = this.parentNode;
      } else if (this.classList.contains("list__content__card")) {
          elem = this.parentNode.parentNode.parentNode.parentNode;
      } else {
          elem = this.parentNode.parentNode;
      }
    }
    
    //перемищение элементов. 
    if (side) {
     if (elem.nextElementSibling == null) {
        let dragParent = dragObj.parent.parentNode.removeChild(dragObj.parent);
        elem.parentNode.appendChild(dragParent);
      } else if (elem.previousElementSibling == null) {
        elem.parentNode.insertBefore(dragObj.parent, elem);
      } else if (elem.nextElementSibling == dragObj.parent){
        elem.parentNode.insertBefore(dragObj.parent, elem); 
      } else {
        let elemParent = elem.parentNode.replaceChild(dragObj.parent, elem);
        dragObj.parent.parentNode.insertBefore(elemParent, dragObj.parent);
      }
            
    } else {
        if (elem.previousElementSibling == null) {
          elem.parentNode.insertBefore(dragObj.parent, elem);
        } else if (elem.previousElementSibling == dragObj.parent) {
            elem.parentNode.insertBefore(elem, dragObj.parent); 
        } else if (elem.nextElementSibling == null) {
          let dragParent = dragObj.parent.parentNode.removeChild(dragObj.parent);
            elem.parentNode.appendChild(dragParent);
        } else {
         elem.parentNode.insertBefore( dragObj.parent, elem);
        }
    }
  }

  function dragEnd(e) {
    let elem = this.className === "list__title" ? 
      this.parentNode : this;
    document.body.removeChild(document.querySelector(".hiddenCloneElem"));
    elem.classList.remove("opacityZero");
    dragObj = {};
  }

  //координаты карточки или листа
  function  getCoords(elem) { 
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }