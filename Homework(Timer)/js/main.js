
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
var sec = 0;//градус поворота стрелки по цыферблату
var arrow;//присваиваем индекс каждого запуска стрелки таймера
var output = document.getElementById('output');
var clock__arrow = document.querySelector("#clock__arrow");//стрелка

window.onload = function(){

	// сss для анимации стрелки по кругу
	function clockArrow(){
		clock__arrow.style.transform = "rotate("+sec+"deg)";
		if (sec + 1.5 == 361.5){
			sec = 0;	
		}
		sec = sec +1.5;
	}

	//для отсчёта времени
	var startTime = function () { 
		var thisDate = new Date();//время в данный момент

		//odds - это разница между стартом (startDate) и паузой(stopDate) 
		//нужна для продолжения таймера с места паузы, а не с нуля
		//по умолчанию odds = 0
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

	 	//lap - значение таймера на момент выхода. Нужен для добавления кругов
	 	lap = output.innerText = h + ':' + m + ':' + s + '.' + ms;
	 }


	 //кнопки start/stop таймера и стрелки
	document.getElementById("startStop").onclick = function(){
		//проверка на START или STOP
		//так же проверка на продолжения после паузы или  старта с нуля
		if (offOn == 0 ) {
			startDate = new Date();//время старта таймера
			offOn = 1;
			arrow = setInterval(clockArrow, 300);//пуск стрелки
			intervalHandler = setInterval (startTime, 10);//пуск таймера
		} else {
			clearInterval(arrow);//пауза стрелки
			clearInterval(intervalHandler);//пауза таймера
	 		stopDate = new Date();//время паузы
	 		offOn = 0;
	 		//разница времени между паузой и началом.
	 		//эту разницу плюсуем к времени  в данный момент работы (thisDate.getTime)
	 		//нужна для подолжения таймера с того момента где его остановили
	 		odds = odds +  stopDate.getTime() - startDate.getTime(); 
 		}
	}

	//reset - сброс всех данных и кругов и стрелки
	document.getElementById("reset").onclick = function(){
		clearInterval(arrow);//останавливаем стрелку
		clearInterval(intervalHandler);//останавливаем таймер
		
		//возвращаем стрелку в положение START
		document.querySelector("#clock__arrow").style.transform = "rotate(0deg)";
		sec = 0;//обнуляем градусы  поворота стрелки
		offOn = 0;//приводим кнопку START/STOP к start
		odds = 0;//обнуляем разницу между startDate и stopDate, чтобы отсчет начался с нуля
		output.innerText = "00:00:00.00";//обнуляем цыферблат
		timer__lap.innerHTML = "";//обнуляем круги
	}

	//добавление пройденных кругов в список
	document.getElementById("lap").onclick = function(){
		var newLap = document.createElement('li');//добавляем время кругов в список
		newLap.innerHTML = lap;//время круга
		timer__lap.appendChild(newLap);	
	}

}