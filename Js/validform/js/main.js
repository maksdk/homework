window.addEventListener("load", init, false);
			var arrInput = document.getElementsByTagName("input");
			//textarea
			var textarea = document.getElementById("textarea");
			//картинки глаза для скрытия и открытия пароля
			var passEye = document.getElementsByClassName("passEye");
			//label - радиокнопок
			var labelRadio = document.getElementsByClassName("radioButton");
			
			function init() {
				
				for(var i =0; i < arrInput.length; i++){
					var element = arrInput[i];
					if(element.type == "submit"){
						if(element.name == "send"){
							//кнопка отправки данных
							element.addEventListener("click", buttonSend, false);
							continue;
						}
						if(element.name == "exit"){
							//кнопка выхода
							element.addEventListener("click", buttonExit, false);
							continue;
						}
						continue;
					}
					if(element.type == "radio"){
						//радиокнопки
						element.addEventListener("click", radioButton, false);
						continue;
					}
					element.addEventListener("focus", focusInput, false);
					element.addEventListener("blur", blurInput, false);
					element.addEventListener("keypress", keyFilter, false);
				}
				//обработчик для textarea
				textarea.addEventListener("focus", focusInput, false);
				textarea.addEventListener("blur", blurInput, false);
				textarea.addEventListener("keypress", changeHeigthTextarea, false);
				textarea.addEventListener("keypress", keyFilter, false);
				textarea.addEventListener("scroll", scrollTextarea, false);

				//обработчик для label радиокнопок
				for(var c = 0; c < labelRadio.length; c++){
					var labelRadioElem = labelRadio[c];
					labelRadioElem.addEventListener("click", radioButton, false);
				}

				//обработчик для открытия и скрытия пароля (глаз)
				for(var j = 0; j < passEye.length; j++){
					var passEyeElem = passEye[j];
					passEyeElem.addEventListener("click", openPassword, false);
				}

			}

//========== КЛИК НА ИНПУТЫ С ПОЛЕМ ДЛЯ ВВОДА ==========
			function focusInput(e){
				//label-смена позиции
				var label = "label_" + this.name;
					label = document.getElementById(label);
				 label.classList.add("labelUp");

				 //смена бордера и цвета иконки
				var classGreen = this.name +"__iconGreen",
					classRed   = this.name +"__iconRed"
				this.classList.add(classGreen);
				this.classList.add("valid");
				this.classList.remove(classRed);
			}

//========== ПОТЕРЯ ФОКУСА ИНПУТАМИ ================
			function blurInput(e){
				if(this.value == ""){
					//label - смена позиции
					var label = "label_" + this.name;
						label = document.getElementById(label);
						label.classList.remove("labelUp");
					
					//смена иконок и бордера
					var classGreen = this.name +"__iconGreen",
						classRed   = this.name +"__iconRed";
						this.classList.remove(classGreen, classRed);
						this.classList.remove("valid");

					//очистка сообщения об ошибке
					var errorMsg   = "errorMsg_" + this.name;
						errorMsg = document.getElementById(errorMsg);
						if(errorMsg == null){return;}
						errorMsg.innerHTML = "";

				} //проверка email на валидность
				else if( this.name == "email") {
					var value = this.value;
					validEmail(value);
				
				} //проверка password 
				else if(this.name == "passwordTop" || this.name == "passwordBottom"){
					validPassword();
				
				}//роверка телефона
				else if(this.name == "phone"){
					var value = this.value;
					validPhone(value);
				}
			}

//========== ПРОВЕРКА ВВОДИМЫХ ЗНАЧЕНИЙ=================
			function keyFilter(e){
				var pattern = this.dataset.val, 
				    msg     = this.dataset.valMsg,
				    msgId   = this.dataset.valMsgId,
				    value   = e.key;
				var res = value.search(pattern);
				
				if(res == -1){
					//сообщение об ошибке, смена иконки
					document.getElementById(msgId).innerText = msg;
					var classRed = this.name +"__iconRed";
						this.classList.add(classRed);
						this.classList.remove("valid");
					e.preventDefault();
				}
				else {
					//смена иконок и удаление сообщения об ошибке
					document.getElementById(msgId).innerText = "";
					var classGreen = this.name +"__iconGreen";
						this.classList.add(classGreen);
						this.classList.add("valid");
					var classRed = this.name +"__iconRed";
						this.classList.remove(classRed);
				}
			}

//========== ПРОВЕРКА ПОЛЯ ТЕЛЕФОН=======================
			function validPhone(value){
				if(value.length != 10){
					phone.classList.add("phone__iconRed");
					phone.classList.remove("phone__iconGreen");
					phone.classList.remove("valid");
					errorMsg_phone.innerText = "Это поле заполнено не верно";
				} else {
					phone.classList.add("phone__iconGreen");
					phone.classList.remove("phone__iconRed");
					phone.classList.add("valid");
				}
			}

//========== ПРОВЕРКА ПОЛЯ EMAIL=======================
			function validEmail(value){
				var patter = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
				var test = patter.test(value);
				if(test == false){
					errorMsg_email.innerText = "Введите в формате: mail@mail.com";
					email.classList.add("email__iconRed");
					email.classList.remove("email__iconGreen");
					email.classList.remove("valid");
					
				}else {
					errorMsg_email.innerText = "";
					return;
				}
				
			}

//========== ПРОВЕРКА ПОЛЕЙ ПАРОЛЯ=======================
			function validPassword(){
				var pass_1 = document.getElementById("passwordTop");
				var pass_2 = document.getElementById("passwordBottom");
				if((pass_1.value != "") && (pass_2.value != "")){	
						if (pass_1.value != pass_2.value) {
							errorMsg_passwordTop.innerText = "Пароли не совпадают";
							errorMsg_passwordBottom.innerText = "Пароли не совпадают";
							pass_1.classList.add("passwordTop__iconRed");
							pass_2.classList.add("passwordBottom__iconRed");
							pass_1.classList.remove("valid");
							pass_2.classList.remove("valid");

							pass_1.parentNode.classList.remove("checkOK");
							pass_2.parentNode.classList.remove("checkOK");
						} else {
							errorMsg_passwordTop.innerText = "";
							errorMsg_passwordBottom.innerText = "";
							pass_1.classList.remove("passwordTop__iconRed");
							pass_2.classList.remove("passwordBottom__iconRed");
							pass_1.classList.add("valid");
							pass_2.classList.add("valid");

							pass_1.parentNode.classList.add("checkOK");
							pass_2.parentNode.classList.add("checkOK");
						}
				}else return;
			}

//========== ПОКАЗ И СКРЫТИЕ ПАРОЛЯ В ПОЛЕ ВВОДА =======================
			function openPassword(e){
				var eyeName = this.name;
					if(eyeName == "passwordTop"){
						if(passwordTop.type == "password"){
							passwordTop.type = "text";
							this.classList.add("passEye__visible");
						}else {
							passwordTop.type = "password";
							this.classList.remove("passEye__visible");
						}
					}
					else if(eyeName == "passwordBottom"){
						if(passwordBottom.type == "password"){
							passwordBottom.type = "text";
							this.classList.add("passEye__visible");
						}else {
							passwordBottom.type = "password";
							this.classList.remove("passEye__visible");
						}
					}
			}

//========== РАДИОКНОПКИ. СМЕНА БОРДЕРА И ИКОНКИ ПРИ КЛИКЕ =============
			function radioButton(e){
				//добираемся к родителю родителя радиокнопки и меняем bg
				var parent = this.parentNode.parentNode;
					parent.classList.remove("form__block__radio--iconRed");
					parent.classList.add("form__block__radio--iconGreen");
					this.classList.add("valid");
				var errorMsg = "errorMsg_" + this.name;
					document.getElementById(errorMsg).innerText = "";
			}
			
//========== СМЕНА ВЫСОТЫ TEXTAREA ПРИ ВВОДЕ В НЕГО ТЕКСТА =============
			function changeHeigthTextarea(e){
				//достаем высоту родительского блока в котором находиться textarea. 
				//при увеличении textarea будем увеличивать и блок
				var divHeigth = form__block__textarea.clientHeight;
				
				//достаем высоту textarea.
				var textareaHeigth = textarea.clientHeight;
				
				//разница высот textarea и родителем.
				// будем ее добавлять к меняющейся высоте textarea
				// сумма textarea и разницы будет = высота родительского блока 
				var differHeigth = divHeigth - textareaHeigth;
					
				//изменение высот
				textarea.style.height =" auto";
				textarea.style.height = this.scrollHeight + 4 + "px";//c 4 так и не разобрался но без нее при вводе текста поле уменьшается на 4px - это все ламает
				form__block__textarea.style.height = this.scrollHeight + differHeigth + "px";

			}

			function scrollTextarea(){
				//обнуляем  прокрутку, чтобы textarea не прыгал при переходе на новую строку
				this.scrollTop = 0; 
			}

//========== КНОПКА ОТПРАВКИ ДАННЫХ И ВЫВОДА ИХ В НОВОМ ОКНЕ =============
			function buttonSend(e){
				e.preventDefault();
				var person = {};//обьект для заполненых данных
				var check = 0;//проверка радиокнопок: ОТМЕЧЕНА ИЛИ НЕТ	
				
				for(var i=0; i < form.elements.length; i++){
					var element = form.elements[i];
					//проверка на правильную заполненость. Достаем значения и записываем их в обьект
					if(element.classList.contains("valid")){
						if(element.name == "firstName"){
						person.firstName = element.value;
						continue;
						}
						if(element.name == "lastName"){
							person.lastName = element.value;
							continue;
						}
						if(element.name == "age"){
							person.age = element.value;
							continue;
						}
						if(element.name == "sex"){
							person.sex = element.value;
							continue;
						}
						if(element.name == "email"){
							person.email = element.value;
							continue;
						}
						if(element.name == "phone"){
							person.phone = element.value;
							continue;
						}
						if(element.name == "textarea"){
							person.message = element.value;
							continue;
						}
					}
					//проверка радиокнопок (отметили или нет)
					else if (element.type == "radio"){
						//если заходили сюда 2 раза, то ни одна из кнопок не отмечена
						check++;
							if(check > 1){
								var parent = element.parentNode.parentNode;
									parent.classList.add("form__block__radio--iconRed");
								var errorMsg = "errorMsg_" + element.name;
								document.getElementById(errorMsg).innerText = "Это поле обязательно для заполнения";
								continue;
							}
					}
					//проверка на пустое поле
					else if(element.value == "") {
						var classRed = element.name +"__iconRed";
							element.classList.add(classRed);

						var errorMsg = "errorMsg_" + element.name;
						document.getElementById(errorMsg).innerText = "Это поле обязательно для заполнения";
						continue;
					}
				}
				
				//длина обьекта
				//если длина 7 то все поля заполнены верно
				var counter = 0;
				for (var key in person) {
					counter++;
				}
					//пробегаем по обьекту и выводим значения
					if(counter == 7){
						var send = document.getElementById("message").getElementsByTagName("p");
						var j = 0;
						for (var key in person) {
							send[j].innerHTML = "<strong>" + send[j].innerText + "</strong>"+ " " + person[key];
								j++;
						}
						//message - блок для вывода данных
						message.classList.add("displayBlock");
						message.classList.remove("displayNone");
						
						//скрываем  форму 
						form.classList.add("displayNone");
				}else return;
			}

//========== КНОПКА ВЫХОДА =============			
			function buttonExit(e){
				e.preventDefault();
				document.body.classList.add("displayNone");
			}