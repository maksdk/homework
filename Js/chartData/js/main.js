 window.addEventListener("load", init, false);
    
    var submit = document.querySelectorAll("input");
	var container = document.getElementById("container");
	
	function init(){
		for(var i = 0; i < submit.length; i++){
			var element = submit[i];
			if(element.name == "sortUp"){
				element.addEventListener("click", sortUp, false);
				continue;
			}
			if(element.name == "sortDown"){
				element.addEventListener("click", sortDown, false);
				continue;
			}
			if(element.name == "addData"){
				element.addEventListener("click", addData, false);
				continue;
			}
			if(element.name == "add"){
				element.addEventListener("keypress", keyFilter, false);
				continue;
			}
		}
		
		var chart = createChart([30,12, 88, 91,10, 200, 100, 30, 50, 63,37, 26],
            600,
            300,
            "green");
		container.appendChild(chart);
	}

	//Генерируем график
	function createChart(data, width, height, color){
		var chart = document.createElementNS("http://www.w3.org/2000/svg","svg");
		chart.setAttribute("height", height);
	    chart.setAttribute("width", width);
		
		var max = Number.NEGATIVE_INFINITY;
	 	for (var i = 0; i < data.length; i++) {
			if (max < data[i]) max = data[i];
	  	}
			
		var scale = (height-20)/max; //20 - это буфер для текста над баром
		var barWidth = Math.floor(width/data.length)
		
		for (var i = 0; i < data.length; i++) {
			//контейнер
			var barConteiner = document.createElementNS("http://www.w3.org/2000/svg", "g");
	       //бар
	        var bar = document.createElementNS("http://www.w3.org/2000/svg","rect");
	        //текст с данными бара
	        var barText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	        var barHeight = data[i] * scale;

	        bar.setAttribute("height", barHeight + "px");
	        bar.setAttribute("width", barWidth - 4 + "px");
			bar.setAttribute("y", height - barHeight);
	        bar.setAttribute("x", barWidth * i );
			bar.style.fill = color;

			//текст с данными
			barText.setAttribute("y", height - barHeight - 4);
			barText.setAttribute("x", (barWidth * i) + (barWidth/3.5));
	        barText.innerHTML = data[i];
	        barText.style.visibility = "hidden";

	        //контейнер текста и бара
	        barConteiner.appendChild(bar);
	        barConteiner.appendChild(barText);

	        bar.addEventListener("mouseover", onOver);
	        bar.addEventListener("mouseout", onOut);
	        
	        chart.appendChild(barConteiner);
	    }
	    function onOver(e) {
	    	this.nextElementSibling.style.visibility = "visible";
	    	this.style.fill = "red";
	    }
	    function onOut(e) {
	    	this.nextElementSibling.style.visibility = "hidden";
	    	this.style.fill = color; 
	    }
		return chart;

	}

	//Сортировать по возрастанию
	function sortUp(e){
		var data = [],
			svg = document.querySelector("svg"),
			barText = svg.getElementsByTagName("text");
		for(var i = 0; i < barText.length; i++){
			data.push(parseInt(barText[i].innerHTML));
		}
		data.sort(function(a,b){  
			return a - b;
		})
		changeChart(data,svg,barText);
	}

	//Сортировать по убыванию
	function sortDown(e){
		var data = [],
			svg = document.querySelector("svg"),
			barText = svg.getElementsByTagName("text");
		for(var i = 0; i < barText.length; i++){
			data.push(parseInt(barText[i].innerHTML));
		}
		data.sort(function(a,b){  
			return b - a;
		})
		changeChart(data,svg,barText);
	}

	//Добавить новые данные
	function addData(e){
		var value = document.querySelector("input[type='text']").value;
			if(value == ""){
				return;
			}
		var data = [],
			svg = document.querySelector("svg"),
			barText = svg.getElementsByTagName("text");
		for(var i = 0; i < barText.length; i++){
			data.push(parseInt(barText[i].innerHTML));
		}
		data.push(value);
		changeChart(data,svg,barText);
		form.reset();
	}

	//Смена графика при добавлении данных или сортировки
	function changeChart(data,svg,barText){
		var chart = createChart(data,
            600,
            300,
             "green");
		svg.parentNode.removeChild(svg);
		container.appendChild(chart);
	}

	//Валидация ввода данных
	function keyFilter(e){
		var pattern = /[1-9]{1,}/, 
		    msg     = this.dataset.valMsg,
		    msgId   = this.dataset.valMsgId,
		    value   = e.key;
		var res = value.search(pattern);
		if(res == -1){
			document.getElementById(msgId).innerText = msg;
			e.preventDefault();
		}
		else {
			document.getElementById(msgId).innerText = "";
		}
	}