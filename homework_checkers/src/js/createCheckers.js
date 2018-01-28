/*
 * create of the checkers
 */
( function (){
 	var  container = document.querySelector("div"), 
 		board = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
 		windowHeight = document.documentElement.clientHeight,
 		windowWidth = document.documentElement.clientWidth;
 		
 		container.appendChild(board);
 
 	var	sizeBoard = Math.floor((windowHeight / 100) * 80);
 		board.style.height = sizeBoard;
 		board.style.width = sizeBoard;
 		container.style.height = sizeBoard + "px";
 
 	var sizeRect = Math.floor(sizeBoard /8);
 	if (sizeRect % 2){
 		sizeRect++;
 	}
 
 	//create board
 	var	y = 0,
 		x = 0;
 	for(var row = 0; row < 8; row++){
 		x = 0;
     	for(var col = 0; col < 8;col++){
     		var boardRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
     		if(( row + col ) % 2 == 1 ){
     		     boardRect.setAttribute("height", sizeRect);
 		          boardRect.setAttribute("width", sizeRect);
 			     boardRect.setAttribute("y", y);
 		          boardRect.setAttribute("x", x);
 		          boardRect.setAttribute("fill", "#85653E");
 		          board.appendChild(boardRect);
 		    } else {
     			boardRect.setAttribute("height", sizeRect);
 		          boardRect.setAttribute("width", sizeRect);
 				boardRect.setAttribute("y", y);
 		          boardRect.setAttribute("x", x);
 		          boardRect.setAttribute("fill", "#EDCFA9");
 		          board.appendChild(boardRect);
     		}	
     		x = Math.floor(sizeRect + x);
     	}
     	y =  Math.floor(sizeRect + y);
     }
 	
 	//create circles
 	var	y = 0,
 		x = 0;
 	for(var row1 = 0; row1 < 8; row1++){
 		x = 0;
     	for(var col1 = 0; col1 < 8;col1++) {
     		if(( row1 + col1 ) % 2 == 1 ) {
     			if(( row1 < 3 )) { //create black circle
 		        	     var boardCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
 		        		    cx =  Math.floor(x + sizeRect/2),
 		        		    cy =  Math.floor(y + sizeRect/2),
 		        		    r  = Math.floor(sizeRect/3);
 		        		
 					boardCircle.setAttribute("cy", cy);
 		        	     boardCircle.setAttribute("cx", cx);
 		        	     boardCircle.setAttribute("r", r)
 		        	     boardCircle.setAttribute("stroke-width", 2);
 		        	     boardCircle.setAttribute("stroke", "#3C3B3B");
 		        	     boardCircle.setAttribute("fill", "#565455");
 					boardCircle.classList.add("black");
 		        	     board.appendChild(boardCircle);
 		        	
 		        	     var boardCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
 		        		    r_small = Math.floor(sizeRect/5);
 		        	
 		        	     boardCircle.setAttribute("cy", cy);
 		        	     boardCircle.setAttribute("cx", cx);
 		        	     boardCircle.setAttribute("r", r_small);
 		        	     boardCircle.setAttribute("stroke-width", 2);
 		        	     boardCircle.setAttribute("stroke", "#3C3B3B");
 		        	     boardCircle.setAttribute("fill", "none");
 		        	     boardCircle.classList.add("black");
 		        	     board.appendChild(boardCircle);
 
 				}else if ((row1 > 4)){ //create white circle
 		        	     var boardCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
 	        			    cx =  Math.floor(x + sizeRect/2),
 	        			    cy =  Math.floor(y + sizeRect/2),
 	        			    r  = Math.floor(sizeRect/3);
 
 		        	     boardCircle.setAttribute("cy", cy);
 		        	     boardCircle.setAttribute("cx", cx);
 		        	     boardCircle.setAttribute("r", r)
 		        	     boardCircle.setAttribute("stroke-width", 2);
 		        	     boardCircle.setAttribute("stroke", "#F8FFEE");
 		        	     boardCircle.setAttribute("fill", "#D4E2CB");
 		        	     boardCircle.classList.add("white");
 		        	     board.appendChild(boardCircle);
 
 		        	     var boardCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
 		        		    r_small = Math.floor(sizeRect/5);
 		        	
 		        	     boardCircle.setAttribute("cy", cy);
 		        	     boardCircle.setAttribute("cx", cx);
 		        	     boardCircle.setAttribute("r", r_small)
 		        	     boardCircle.setAttribute("stroke-width", 2);
 		        	     boardCircle.setAttribute("stroke", "#F8FFEE");
 		        	     boardCircle.setAttribute("fill", "none");
 		        	     boardCircle.classList.add("white");
 		        	     board.appendChild(boardCircle);
 				}
     		}
     		x = Math.floor(sizeRect + x);
     	}
     	y = Math.floor(sizeRect + y) ;
 	}
 	//startGame(board, sizeRect, sizeBoard);
 }());