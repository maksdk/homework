class Create {
  constructor(tag, parent, width, height, x, y, fill, strokeWidth, stroke) {
    this.tag = tag;
    this.parent = parent;
    this.size = size;
    this.fill = fill;
    this.x = x || 0;
    this.y = y || 0;
    this.stroke = stroke || "#85653E";
    this.strokeWidth = strokeWidth;
    this.elem;
    this.height = height;
    this.width = width;
  }
  create() {
    this.elem = document.createElementNS("http://www.w3.org/2000/svg", this.tag);
    this.parent.appendChild(this.elem);
  }
  setAttributesSvg(classElem) {
    this.create();
    this.elem.setAttribute("height", this.height);
    this.elem.setAttribute("width", this.width);
    this.elem.setAttribute("x", this.x);
    this.elem.setAttribute("y", this.y);
    this.elem.classList.add(classElem);
    return this.elem;
  }
  setAttributesRect(classElem) {
    this.create();
    this.elem.setAttribute("height", this.height);
    this.elem.setAttribute("width", this.width);
    this.elem.setAttribute("fill", this.fill);
    this.elem.setAttribute("x", this.x);
    this.elem.setAttribute("y", this.y);
    this.elem.setAttribute("stroke", this.stroke);
    this.elem.setAttribute("stroke-width", this.strokeWidth);
    this.elem.classList.add(classElem);
    return this.elem;
  }
  setAttributesCircle(color, r, classElem) {
    this.create();
    this.elem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.elem.setAttribute("cx", this.x);
    this.elem.setAttribute("cy", this.y);
    this.elem.setAttribute("r", r);
    this.elem.setAttribute("fill", this.fill);
    this.elem.setAttribute("stroke", this.stroke);
    this.elem.setAttribute("stroke-width", this.strokeWidth);
    this.elem.classList.add(color, "slowMove");
    this.elem.addEventListener("click", clickCircle, false);
    return this.elem;
  }
  setAttributesVerySmallCircle(classElem) {
    this.create();
    this.elem.setAttribute("cx", this.x);
    this.elem.setAttribute("cy", this.y);
    this.elem.setAttribute("r", size/7);
    this.elem.setAttribute("fill", this.fill);
    this.elem.setAttribute("stroke", this.stroke);
    this.elem.setAttribute("stroke-width", this.strokeWidth);
    this.elem.classList.add("VerySmallCircle");
    return this.elem;
  }
  setAttributesPolyline(points, stroke, classElem) {
    this.create();
    this.elem.setAttribute("points", points);
    this.elem.setAttribute("stroke", stroke);
    this.elem.setAttribute("stroke-width", "3");
    this.elem.setAttribute("fill", "none");
    this.elem.classList.add(classElem);
    return this.elem;
  }
  setAttributesG(classElem) {
    this.create();
    this.elem.classList.add( classElem);
    return this.elem;
  }
  setAttributesText(text , classElem, color ) {
    this.create();
    this.elem.setAttribute("x", this.x);
    this.elem.setAttribute("y", this.y);
    this.elem.setAttribute("font-family", "Verdana");
    this.elem.setAttribute("font-size", "14");
    this.elem.setAttribute("fill", "#B04632");
    this.elem.innerHTML = text;
    this.elem.classList.add(classElem);
    return this.elem;
  }
}
