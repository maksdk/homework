window.addEventListener("load", init, false);
	var arrInput = document.getElementsByTagName("input");
	var arrLabel = document.getElementsByTagName("label");
	
	function init() {
	//обработчики на Input
		for(var i = 0; i < arrInput.length; i++){
			var element = arrInput[i];
	    	if(element.name == "search"){
	    		continue;
	    	}
	    	if(element.name == "delete"){
	    		element.addEventListener("click", deleteRow, false);
	    		continue;
	    	}
	    	if(element.type == "submit"){
	    		element.addEventListener("click", clickButton, false);
	    		continue;
	    	}
	    	element.addEventListener("blur", moveLabelBack, false);
	    	element.addEventListener("click", moveLabelUp, false);
	    	element.addEventListener("focus", moveLabelUp, false);
	    	element.addEventListener("keypress", keyFilter, false); 
	    }
	}
	
	//переменные для новых обьектов.
	var username;
	var surname;
	var age;
	var sex;
	var lang;

	var searchValue;//значение в поиске
	var person = {
		username: "" , 
		surname : "", 
		age:"",
		sex:"",
		lang:""
	};
	var list = [];//массив всего листа
	
	//констуктор
	function Person(username, surname, age, sex, lang ){
		this.username    = username;
		this.surname = surname;
		this.age     = age;
		this.sex     = sex;
		this.lang    = lang;
	}
				
//========== КЛИК ПО КНОПКАМ========================	
	function clickButton(e) {
		if(this.type == "submit"){
			e.preventDefault();
			if(this.value == "Add person"){
				addPerson__start.style.display = "none";
				addPerson__table.style.display = "none";
				addPerson__form.style.display = "block";
			}else if (this.value == "Add into list"){
				addIntoList();
				clearInput();
				allLabelBack();
			}else if (this.value == "Show all list"){
				showAllList();
				resetData();
				clearInput();
				allLabelBack();
			}else if (this.value == "Exit"){
				exit();
			}else if (this.value == "Search"){
				search();
			}
		} 
	}

//==========СМЕНА БОРДЕРА И ТРАНСФОРМАЦИЯ LABEL UP ===========
	function moveLabelUp(e){
		var thisLabel = this.previousElementSibling;//достаем label
		thisLabel.style.transform  = "translateY(-27px)";
		
		var className = this.name;
		this.style.border = "2px solid #1ABC9C";
		this.classList.add(className );
	}
	
//========== СМЕНА БОРДЕРА И ТРАНСФОРМАЦИЯ LABEL + ПРОВЕРКА НА ПУСТОЙ ИНПУТ======
	function  moveLabelBack(e){
		if(this.value == ""){
			var thisLabel = this.previousElementSibling;//достаем label
			thisLabel.style.transform  = "translateY(0px)";

			var thisSpan = this.nextElementSibling;//достаем span
			thisSpan.innerHTML = "";

			var className = this.name;//присваиваем класс по имени
			this.classList.remove(className);
			this.style.border = "2px solid #E2E4E6";
		} else return;
	}
//==========ФИЛЬТР ВВОДА ТЕКСТА=================================
	function keyFilter(e){
		var pattern = this.dataset.val;
		var inputName = this.name;
		var msg  = this.dataset.valMsg;
		var msgId  = this.dataset.valMsgId;
		var className = this.name;
		var value = e.key;
		var res = value.search(pattern);
		if(this.name == "search"){
			return;
		}
		else if(res == -1) {
			document.getElementById(msgId).innerHTML = msg;
			this.classList.remove(className);
			this.style.border = "2px solid red";
			e.preventDefault();
		} else { 
			document.getElementById(msgId).innerHTML = "";
			this.classList.add(className);
			this.style.border = "2px solid #1ABC9C";
		}
	}
//==========ДОБАВЛЕНИЕ НОВЫХ ДАННЫХ В ТАБЛИЦУ=========
	function addIntoList(){
		checkLocalStorage();//достаем сохраненые данные в local
		
		//проверка всех полей на заполненость
		for(var i = 0; i < arrInput.length; i++){
    	var element = arrInput[i];
	    	if(element.type == "text"){
	    		if(element.value == ""){
	    			element.style.border = "2px solid red";
	    			element.nextElementSibling.innerHTML = "Must be filled out";
	    			return;
	    		} else {
	    			addDataNewObject();//добавляем данные нового обьекта
	    		}
	    	}
	    }
	    
		//при добавлении в таблицу создаеться новый объект и пуш его в массив
		person = new Person(username, surname, age, sex, lang);
		list.push(person);
		
		//сохраняем массив с новым  данными в локал
		var allList = JSON.stringify(list);
		localStorage.list = allList;
		
		//выводим новые данные на экран
		var i=0;
		var arrSpan = document.getElementById("addPerson__form__added").getElementsByTagName("span");
		for(property in person){
			arrSpan[i].innerHTML = "<strong>" + property + "</strong>" + " : " + person[property];
			i++;
		}
		addPerson__form__added.style.display = "block";
	}

//==========ВЫВОД ВСЕХ ДАННЫХ В ТАБЛИЦУ==========
	function showAllList(){
		//сообщение при отсутствии данных
		if (localStorage.list == undefined){
			var p = document.getElementById("addPerson__start").getElementsByTagName("p");
			p[0].innerHTML = "The list doesn't have data";
			addPerson__start.style.display = "block";
			addPerson__form.style.display = "none";
			return;
		}
		
		var list = JSON.parse(localStorage.list);//достаем данные 
		var addPerson__table__main = document.getElementById("addPerson__table__main");//достаем таблицу
		addPerson__table__main.innerHTML = "";//обнуляем  старые данные в таблице
		var row = document.createElement("tr");
			addPerson__table__main.appendChild(row);
			//добавляем th
			for(property in person){
				var colHead = document.createElement("th");
				row.appendChild(colHead);
				colHead.innerHTML = property;
			}
			//добавляем td
            for(var index = 0; index < list.length; index ++) {
                var row = document.createElement("tr");
                addPerson__table__main.appendChild(row);
                for (property in list[index]) {
                    var td = document.createElement("td");
                    td.innerText = list[index][property];
                    row.appendChild(td);
                }
            }
        //обновление данных в таблице и вывод на экран
        addPerson__table__main.innerHTML = addPerson__table__main.innerHTML;
		addPerson__form.style.display = "none";
		addPerson__start.style.display = "none";
		addPerson__table.style.display = "block";
	}
//========== ПОИСК===============
	function search(){
		searchValue = document.getElementById("search").value;//значение ввода
		
		//достаем таблицу и обнуляем старые результаты поиска
		var addPerson__tabel__search = document.getElementById("addPerson__tabel__search");
		addPerson__tabel__search.innerHTML = "";
		
		//достаем данные в в гланом списке и пробигаемся по ним поиском
		var td = document.getElementById("addPerson__table__main").getElementsByTagName("td");
		var tr = document.getElementById("addPerson__table__main").getElementsByTagName("tr");

		for(var i = 1; i < tr.length; i++){//пробегаем через все строки
			var tdValueName = tr[i].children[0].innerText;//пробегаем по всем именам и ищем совпадения с поиском
			if(searchValue == tdValueName){//сравниваем
				//выводим результат
				var foundRow = tr[i].cloneNode(true);
				addPerson__tabel__search.appendChild(foundRow);
				addPerson__tabel__search.createCaption().innerHTML = "Searching results: ";
			}
		}

		//если поиск не дал результат
		if(addPerson__tabel__search.innerHTML == ""){
			addPerson__tabel__search.innerHTML = "<p>Nothing found</p>";
		}

	}
//===========УДАЛЕНИЕ ДАННЫХ================
	function deleteRow(){
		checkLocalStorage();//достаем доступные данные массива 
		
		//ищем имя удяляемого обьекта в массиве
		// searchValue - глобальная переменая в которой хранится значение введенное в поиск
		for(var index = 0; index < list.length; index ++) {
          	var userNameValue = list[index].username;
          	if(searchValue == userNameValue){
              	var removed = list.splice(index, 1);
            }
        }
        //сохраняем массив без удаленого обьекта
		var allList = JSON.stringify(list);
		localStorage.list = allList;
		
		//выводим таблицу с новыми данными
		showAllList();

		//оповищение об удалении
		var addPerson__tabel__search = document.getElementById("addPerson__tabel__search");
		addPerson__tabel__search.innerHTML = "<p>Person deleted</p>";
	}

//==========ПРОВЕРКА НАЛИЧИЯ СОХРАНЕНЫХ ДАННЫХ В LocalStorage==========
	function checkLocalStorage(){

		if((list.length == 0) && (localStorage.list != undefined)){
			var oldData = JSON.parse(localStorage.list);
			for(var index = 0; index < oldData.length; index++){
		    	list.push(oldData[index]);
		    }
		}else return;
	}

//==========ЗАПИСЬ НОВЫХ ДАННЫХ В ОБЬЕКТ===============
	function addDataNewObject(){
		for(var i = 0; i < arrInput.length; i++){
			if(arrInput[i].name == "username"){
	 			username = arrInput[i].value;
	 			continue;
	 		} 
	 		if(arrInput[i].name == "surname"){
	 			surname = arrInput[i].value;
	 			continue;
	 		} 
	 		if(arrInput[i].name == "age"){
	 			age = arrInput[i].value;
	 			continue;
	 		}
	 		if(arrInput[i].name == "sex"){
	 			sex = arrInput[i].value;
	 			continue;
	 		} 
	 		if(arrInput[i].name == "lang"){
	 			lang = (arrInput[i].value);
	 			var arrLang = lang.split(/\s/);
	 			lang = arrLang.join(', ');
	 			continue;
	 		}  
		}
	}

//===========УДАЛЕНИЕ ДАННЫХ С ВЫПАДАИЩЕГО СПИСКА ================
	function resetData(){
		//удаление списка под формой с новыми данными. 
		var arrSpan = document.getElementById("addPerson__form__added").getElementsByTagName("span");
		for(var i = 0; i < arrSpan.length; i++){
			arrSpan[i].innerHTML = "";
			addPerson__form__added.style.display = "none";
		}
	}

//=========== CLEAR INPUT =============
	function clearInput(){
		//обнуляем поля в импутах
		for(var i = 0; i < arrInput.length; i++){
			if(arrInput[i].type == "text"){
				var elemtInput = arrInput[i];
				elemtInput.value = "";
				elemtInput.classList.remove(elemtInput.name);
			}
		}
	}
//========== ALL LABEL BACK======
	function allLabelBack(){
		//возвращение label после очистки инпутов
		for(var j = 0; j < arrLabel.length; j++){
			var elemLable = arrLabel[j];
			elemLable.style.transform  = "translateY(0px)";
		}
	}
//==========ВЫХОД===============
	function exit(){
		document.body.style.display = "none";
	}