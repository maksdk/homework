var intervalHandler;//присваиваем индекс каждого запуска setInterval
var count;//счетчик кругов(милл.сек.) интервального запуска функции
var startDate;//присваиваем время старта таймера
var stopDate;//присваиваем время остановки(паузы) таймера
var lap;//присваиваем значение таймера в момент нового круга
var odds = 0;//разница между startDate и stopDate. 
			//Нужна для продолжения пуска таймера после остановки
var offOn = 0;//Переключатель для кнопок  startStop и reset. 
			  //Если  offOn = 0, то последняя команда была stop или reset.
			  //Если  offOn = 1, то последняя команда была start.
var arrow;//присваиваем индекс каждого запуска стрелки таймера
var output = document.getElementById('output');//циферки
var clock__arrow = document.querySelector("#arrow");//стрелка
var deg = 1.5;//градусы 

	window.onload = function(){
	
	//===ДЛЯ СЧЕТА ВРЕМЕНИ
		var startTime = function () { 
			var thisDate = new Date();//время в данный момент

			//odds - это разница между стартом (startDate) и паузой(stopDate) 
			//нужна для продолжения таймера с места паузы, а не с нуля
			//по умолчанию odds = 0
			//его значение рассчитывается в строке 186
			count = (thisDate.getTime() + odds) - startDate.getTime();
			var ms = count%1000; count-=ms;//ms - миллисекунды
			ms=Math.floor(ms/10);//приводим ms к двухзначному числу и вытаскиваем 
								//целое число перед точкой(Math.floor)
			count = Math.floor (count/1000); 
			var s = count%60; count-=s; //s - секунды
			count = Math.floor (count/60);
			var m = count%60; count-=m; //m - минуты
			count = Math.floor (count/60);
			var h = count%60; //h - часы
		 	//добавляем ноль к однозначному числу 
		 	if (h<10) h='0'+h;
		  	if (m<10) m='0'+m;
		  	if (s<10) s='0'+s;
		 	if (ms<10) ms='0'+ms;
			lap = output.innerText = h + ':' + m + ':' + s + '.' + ms;//lap - значение таймера на момент выхода из этой функции. Нужен для добавления кругов
		 }

	//===ДЛЯ КНОПКИ START/STOP
		document.getElementById("startStop").onclick = function(){
			//проверка на START или STOP
			//так же проверка на продолжения после паузы или  старта с нуля
			if (offOn == 0 ) {
				startDate = new Date();//время старта таймера
				offOn = 1;
				startStop.style.color = "#BE1C1C";
				arrow = setInterval(arrowClock, 249);//пуск стрелки
				intervalHandler = setInterval (startTime, 10);//пуск таймера
			} else {
				clearInterval(arrow);//пауза стрелки
				clearInterval(intervalHandler);//пауза таймера
		 		stopDate = new Date();//время паузы
		 		offOn = 0;
		 		startStop.style.color = "#2F912F";
		 		//разница времени между паузой и началом.
		 		//эту разницу плюсуем к времени  в данный момент работы (thisDate.getTime)
		 		//нужна для подолжения таймера с того момента где его остановили
		 		odds = odds +  stopDate.getTime() - startDate.getTime(); 
	 		}
		}

	//===RESET - ДЛЯ СБРОСА ВСЕХ ЗНАЧЕНИЙ
		document.getElementById("reset").onclick = function(){
			clearInterval(arrow);//останавливаем стрелку
			clearInterval(intervalHandler);//останавливаем таймер
			
			//возвращаем стрелку в положение START
			clock__arrow.setAttribute("x2", 150);//смена координат
			clock__arrow.setAttribute("y2", 12);
			deg = 1.5;//обнуляем градусы  поворота стрелки
			offOn = 0;//приводим кнопку START/STOP к start
			odds = 0;//обнуляем разницу между startDate и stopDate, чтобы отсчет начался с нуля
			output.innerText = "00:00:00.00";//обнуляем цыферблат
			timer__lap.style.border = "none";
			timer__lap.innerHTML = "";//обнуляем круги
		}

	//===ДОБАВЛЕНИЕ ПРОЙДЕННЫХ КРУГОВ СПИСОК
		document.getElementById("lap").onclick = function(){
			var newLap = document.createElement('li');//добавляем время кругов в список
			newLap.innerHTML = lap;//время круга
			timer__lap.style.border = "2px solid #3E7174";
			timer__lap.appendChild(newLap);	
		}

	//===ДЛЯ АНИМАЦИИ СТРЕЛКИ
		function arrowClock(){
			var x = 150;// это координаты центра круга
			var y = 250;
			//deg - это градусы
			var alpha = deg*Math.PI/180; 
			var rx = 150 - x;//150 и 110 - это координаты старта
			var ry = 110 - y;
			var c = Math.cos(alpha);
			var s = Math.sin(alpha);
			var x1 = x + rx * c - ry * s;
			var y1 = y + rx * s + ry * c;
			deg = deg + 1.5; 
			clock__arrow.setAttribute("x2", x1);//смена координат
			clock__arrow.setAttribute("y2", y1);
		}
	}