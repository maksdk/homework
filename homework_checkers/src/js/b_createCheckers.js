let wrapper = document.querySelector('#wrapper');

//размер олной ячейки на доске
let size = Math.floor(document.documentElement.clientHeight * .80  / 8);
	size % 2 ? size++ : size = size;

//отрисовка бордеров, контейнеров
let container = new Create("svg", wrapper, size*11, size*9).setAttributesSvg("container"),
	outerBoard =new Create("svg", container, size*9, size*9, size, 0).setAttributesSvg("outerBoard"),
	strokeOuter = new Create("rect", outerBoard, size*9, size*9, 0, 0, "#EDCFA9", 5).setAttributesRect("strokeOuter");
let middleBoard = new Create("svg", outerBoard, size*8.1, size*8.1, size/2-2, size/2-2).setAttributesSvg("middleBoard"),
	strokeMid = new Create("rect", middleBoard, size*8.1, size*8.1, 0, 0, "#85653E", 5).setAttributesRect("strokeMid");

//отрисовка доски, ячеек и фишек
let innerBoard = new Create("svg", container, size*9.5, size*8, size*1.5+1, size*0.5+1).setAttributesSvg("innerBoard");
createRect();
createCircle();

//контейнеры для отрисовки пути хода фишки
let polylineParent = new Create("g", innerBoard).setAttributesG("polylineParent");
let verySmallCircleParent = new Create("g", innerBoard).setAttributesG("verySmallCircleParent");


//стрелка для указании хода
let arrowMovePoints = `${1},${1} ${size*0.7},${1} ${size*0.85},${size*0.3} ${size*0.7},${size*0.6} ${1},${size*0.6} ${1},${1}`;
let arrowMoveParent = new Create("svg", container, size, size/1.5, 0, 0).setAttributesSvg("displayNone");
let arrowMove = new Create("polyline", arrowMoveParent).setAttributesPolyline(arrowMovePoints, "#B04632", "arrowMove");
let text1 = new Create("text", arrowMoveParent, null, null, 5, size/4).setAttributesText( `` ,"text1");
let text2 = new Create("text", arrowMoveParent, null, null, 5, size/2).setAttributesText( 'move' ,"text2");


function createRect() {
	let fill,
		x = 0,
		y = 0;
	for (let j = 0; j < 8; j++) {
		for (let i = 0; i < 8; i++) {
			((j + i)  % 2) ? fill = "#85653E" : fill = "#EDCFA9";
			let rectBoard = new Create("rect", innerBoard, size,size, x, y, fill, 0, null).setAttributesRect("rectBoard");
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
		stroke = "#3C3B3B",
		color = "black";
	for (let j = 0; j < 6; j++) {
		for (let i = 0; i < 4; i++) {
			let circleBoard = new Create("circle", innerBoard, null, null, cx, cy, fill, 2, stroke).setAttributesCircle(color, size/3);
			let smallCircleBoard = new Create("circle", innerBoard, null, null, cx, cy, fill, 2, stroke).setAttributesCircle(color, size/5);
			cx += size * 2;
		}
		if (j == 2) {
			cy = size * 5.5;
			cx = size/2;
			fill = "#D4E2CB";
			stroke = "#F8FFEE";
			color = "white";
		}  else if (j % 2) {
			cy += size;
			cx = size * 1.5;
		} else {
			cy += size;
			cx = size/2;
		}
	}
}