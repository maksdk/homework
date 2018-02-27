class CreateCheckers {
  constructor(tag, parent, scale, x, y, fill, strokeWidth, stroke) {
    this.tag = tag;
    this.parent = parent;
    this.size = size;
    this.scale = scale;
    this.fill = fill;
    this.x = x || 0;
    this.y = y || 0;
    this.stroke = stroke || "#85653E";
    this.strokeWidth = strokeWidth;
    this.elem;
  }
  create() {
    this.elem = document.createElementNS("http://www.w3.org/2000/svg", this.tag);
    this.parent.appendChild(this.elem);
  }
  setAttributesSvg(width = 0) {
    this.parent == document.body ? width = size * 2 : 0;
    this.create();
    this.elem.setAttribute("height", this.size * this.scale);
    this.elem.setAttribute("width", this.size * this.scale + width);
    this.elem.setAttribute("x", this.x);
    this.elem.setAttribute("y", this.y);
    return this.elem;
  }
  setAttributesRect() {
    this.create();
    this.elem.setAttribute("height", this.size * this.scale);
    this.elem.setAttribute("width", this.size * this.scale);
    this.elem.setAttribute("fill", this.fill);
    this.elem.setAttribute("x", this.x);
    this.elem.setAttribute("y", this.y);
    this.elem.setAttribute("stroke", this.stroke);
    this.elem.setAttribute("stroke-width", this.strokeWidth);
    return this.elem;
  }
  setAttributesCircle(color, r) {
    this.create();
    this.elem.setAttribute("cx", this.x);
    this.elem.setAttribute("cy", this.y);
    this.elem.setAttribute("r", r);
    this.elem.setAttribute("fill", this.fill);
    this.elem.setAttribute("stroke", this.stroke);
    this.elem.setAttribute("stroke-width", this.strokeWidth);
    this.elem.classList.add(color, "slowmove");
    this.elem.addEventListener("click", clickCircle, false);
    return this.elem;
  }
}

let size = Math.floor(document.documentElement.clientHeight * .80  / 8);
size % 2 ? size++ : size = size;
     
let container = new CreateCheckers("svg", document.body, 9).setAttributesSvg(),
  outerBoard =new CreateCheckers("svg", container, 9, size, 0).setAttributesSvg(),
  strokeOuter = new CreateCheckers("rect", outerBoard, 9, 0, 0, "#EDCFA9", 5).setAttributesRect();

let middleBoard = new CreateCheckers("svg", outerBoard, 8.1, size/2-2, size/2-2).setAttributesSvg(),
  strokeMid = new CreateCheckers("rect", middleBoard, 8.1, 0, 0, "#85653E", 5).setAttributesRect();

let innerBoard = new CreateCheckers("svg", middleBoard, 8, 3, 3).setAttributesSvg();
createRect();
createCircle();


function createRect() {
  let fill,
    x = 0,
    y = 0;

  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
      ((j + i)  % 2) ? fill = "#85653E" : fill = "#EDCFA9";
      let rectBoard = new CreateCheckers("rect", innerBoard, 1, x, y, fill, 2, "0").setAttributesRect();
      x += size;
    }
    x = 0;
    y += size;
  }    
}

function createCircle() {
  let cx = size * 1.5, 
    cy = size / 2,
    fill = "#565455",
    stroke = "#3C3B3B";

  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 4; i++) {
      let circleBoard = new CreateCheckers("circle", innerBoard, 1, cx, cy, fill, 2, stroke).setAttributesCircle("black", size/3);
      let smallCircleBoard = new CreateCheckers("circle", innerBoard, 1, cx, cy, fill, 2, stroke).setAttributesCircle("black", size/5);
      cx += size * 2;
    }
      
    if (j == 2) {
      cy = size * 5.5;
      cx = size/2;
      fill = "#D4E2CB";
      stroke = "#F8FFEE";
    } else if (j % 2) {
        cy += size;
        cx = size * 1.5;
    } else {
        cy += size;
        cx = size/2;
    }
  }
}