window.addEventListener("load", init, false);// после загрузки запускаем init
	function init() {
		//четыре переменных для вывода введенной информации при нажатии submit
		var check = false; 
		var userName;
		var userTel;
		var userMail;

		var index;//номер элементов масива при onclick
		var arrP = document.getElementsByTagName("p");//массив параграфов для зеленой галочки
		var arrLabel = document.getElementsByTagName("label");//массив label
		var arrInput = document.getElementsByTagName("input");//массив input
		var arrSpan = document.getElementsByTagName("span");//массив input
		
	//====КЛИК НА КНОПКУ
		document.getElementById("submit").onclick = function(e){
			if(check<3){
				e.preventDefault();
			}else {
				div__form.innerHTML =  "<p> <strong> Ваше имя  </strong>: " + userName + "<br/>" + "<strong> Ваш e-mail  </strong>: " + userMail + "<br/>" + "<strong> Ваш телефон: </strong>" + userTel + "</p>";
			}
		}

		for(var i = 0; i < arrInput.length; i++){
			var element = arrInput[i]; //записываем каждый элемент в переменую 
										//и проверяем его на type
			
			if(element.type != "text")  continue;// continue - после него запускаеться следующий
												// цыкл то что ниже не читает. В данном случае 
												//отсикаем кнопку. Мы вешаем обработчик только на текст.
			if(element.dataset.charsAllowed == undefined)  continue;//пропускаем инпуты без атрибута data-chars-allowed

			element.addEventListener("keypress", keyFilter, false); //вешаем обработчик на инпуты с type=text
			element.addEventListener("blur", onblurInput, false);
			element.addEventListener("focus", onfocusInput, false);
		}
	
	//====ФИЛЬТР ЭЛЕМЕНТОВ
		function keyFilter(e){
			
			if (e.charCode == 0 || e.charCode < 32) return true;
			
			var allowedText = e.target.dataset.charsAllowed;//тут данные атрибута data-chars-allowed инпута на котором был keypress
			var elementMessId = e.target.dataset.messageId; //достаем  атрибут messageId
			
			var symbol = e.key.toLowerCase();//возвращает символ а не код
			if(allowedText.search(symbol) == -1) {//проверка на наличие символа в атрибуте

				if(elementMessId) {
					elementMessId = document.getElementById(elementMessId); //id в переменной
					elementMessId.style.visibility = "visible";
				}
				e.preventDefault();//отмена события по умолчанию(вовд букв)
				return false;
			} 
			else {
				if(elementMessId) {
					elementMessId = document.getElementById(elementMessId); //id в переменной
					elementMessId.style.visibility = "hidden";
				}
				return true;
			}
		}

	//====ПОТЕРЯ ФОКУСА ИНПУТОВ
		function onblurInput(e){
			//регулярки для телефона и мейла
			var patternMail = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
    		var textMail = patternMail.test(arrInput[1].value);
			var patternTel = /^\d{10}$/;
    		var textTel = patternTel.test(arrInput[2].value);

    		//проверка на  пустой импут
			if (arrInput[index].value == ""){
				arrLabel[index].style.transform = "translateY(0)";
				arrP[index].style.visibility = "hidden";
				arrInput[index].style.border = "1px solid red";
				arrSpan[index].innerText = "Обязательно для заполнения";
				arrSpan[index].style.visibility = "visible";
			}
			//проверка мейла
			else if (index == 1) {
				if(textMail){
					okGreen();//227 строка
					userMail = arrInput[1].value;
				}else {
					errorRed();//236 строка
					arrSpan[index].innerHTML = "Введите в формате: mail@mail.com"
				}
			}
			//проверка телефона
			else if(index == 2){
				if(textTel){
					okGreen();//227 строка
					userTel = arrInput[2].value;
				}else {
					errorRed();//236 строка
					arrSpan[index].innerHTML = "Введите в формате: 0932560750"
				}
			}
			else { 
				check = true;
				userName = arrInput[index].value;
				okGreen();//227 строка
			}
			return check = textMail + textTel +check;//возвращает число которое нужно 
													//для проверки данных при нажатии кнопки
		}

	//ФОКУСИРОВКА НА ИНПУТАХ (при клике на инпут ему присваиваеться индекс 
								//и он  используеться в других функциях)
		function onfocusInput (e){
			if(e.target.name == "name") {
				index =0;
			} 
			else if(e.target.name == "email")  {
				 index = 1;
			}
			else if(e.target.name == "tel") {
				 index = 2 ;
			}
			else return;
			arrLabel[index].style.transform = "translateY(-25px)";
		}

	//РИСУЕТ ГАЛОЧКУ И РАМКУ
		function okGreen(){
			arrInput[index].style.border = "1px solid green";
			arrP[index].style.visibility = "visible";
			arrP[index].innerText = "✔";
			arrSpan[index].style.visibility = "hidden";
		}

	//ПРЯЧИТ ЗЕЛЕНУЮ РАМКУ И ГАЛОЧКУ И РУСУЕТ КРАСНУЮ РАМКУ
		function errorRed(){
			arrP[index].style.visibility = "hidden";
			arrInput[index].style.border = "1px solid red";
			arrSpan[index].style.visibility = "visible";
		}
	}