class CreateBoard {
   constructor() {
      this.parent;
      this.element;
   }
   findParent(classElem) {
      this.parent = document.querySelector(`.${classElem}`);
   }
   createElement(tag) {
      this.element = document.createElementNS("http://www.w3.org/2000/svg", tag);
      this.parent.appendChild(this.element);
   }
   setAttributesSvg(classElem, parent, width, height, x, y) {
      this.findParent(parent);
      this.createElement("svg");
      this.element.setAttribute("height", height);
      this.element.setAttribute("width", width);
      this.element.setAttribute("x", x || 0);
      this.element.setAttribute("y", y || 0);
      this.element.classList.add(classElem);
   }
   setAttributesRect(classElem, parent, width, height, x, y, fill, stroke, strokeWidth) {
      this.findParent(parent);
      this.createElement("rect");
      this.element.setAttribute("height", height);
      this.element.setAttribute("width", width);
      this.element.setAttribute("x", x || 0);
      this.element.setAttribute("y", y || 0);
      this.element.setAttribute("fill", fill || "none");
      this.element.setAttribute("stroke", stroke || "none");
      this.element.setAttribute("stroke-width", strokeWidth || 0);
      this.element.classList.add(classElem);
   }
   setAttributesText(classElem, parent, x, y, innerText, fontSize) {
      this.findParent(parent);
      this.createElement("text");
      this.element.setAttribute("x", x);
      this.element.setAttribute("y", y);
      this.element.setAttribute("font-family", "Verdana");
      this.element.setAttribute("font-size", fontSize || "14");
      this.element.setAttribute("fill", "#85653E");
      this.element.innerHTML = innerText;
      this.element.classList.add(classElem);
   }
   setAttributesCircle(colorClass, parent, cx, cy, r, fill, stroke, strokeWidth) {
      this.findParent(parent);
      this.createElement("circle");
      this.element.setAttribute("cx", cx);
      this.element.setAttribute("cy", cy);
      this.element.setAttribute("r", r);
      this.element.setAttribute("fill", fill);
      this.element.setAttribute("stroke", stroke);
      this.element.setAttribute("stroke-width", "2");
      this.element.classList.add(colorClass, "slowMove");
      this.element.addEventListener("click", clickCircle, false);
   }
   setAttributesPolyline(classElem, parent, points, stroke, fill) {
     this.findParent(parent);
     this.createElement("polyline");
     this.element.setAttribute("points", points);
     this.element.setAttribute("stroke", stroke);
     this.element.setAttribute("stroke-width", "3");
     this.element.setAttribute("fill", fill || "none");
     this.element.setAttribute("fill-opacity", ".5");
     this.element.classList.add(classElem);
   }
   setAttributesG(parent, ...classes) {
      this.findParent(parent);
      this.createElement("g");
      this.element.classList.add(...classes);
   }
}

   //размер одной ячейки
   let size = Math.floor(document.documentElement.clientHeight * .8  / 8);
      size % 2 ? size++ : size = size;
    
   let wrapper = document.querySelector('.wrapper');

   let create = new CreateBoard;
      create.setAttributesSvg("outerBoard", "wrapper", size*11, size*9);
      create.setAttributesSvg("outerBoard__board", "outerBoard",  size*10, size*9, size, 0);
      create.setAttributesRect("outerBoard__board--border", "outerBoard__board",  size*9, size*9, 0, 0, "#EDCFA9", "#85653E", 3);
      create.setAttributesRect("outerBoard__board--fill", "outerBoard__board", size*8+4, size*8+5, size*0.5-2, size*0.5-2," #85653E");
      create.setAttributesSvg("outerBoard__board__innerBoard", "outerBoard__board",  size*9.5, size*8, size*0.5, size*0.5+1);
