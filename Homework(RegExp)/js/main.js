window.onload = function () {
	document.getElementById("submit").onclick = function(e){
		e.preventDefault();
		
		//=====ПРОВЕРКА ИМЕНИ=====
		var spanName = document.getElementsByTagName("span")[0];
		var inputName = document.getElementsByTagName("input")[0];
		var userName = inputName.value;
		var patternName = /\D[а-яa-zА-ЯA-Z]/;
        var textName = patternName.test(userName);
        if (textName) {
        	inputName.style.border = "1px solid green";
        	spanName.style.color = "green";
        	spanName.style.fontSize = "24px";
        	spanName.style.marginBottom = "10px";
			spanName.innerHTML = "✔";
			end();
		}else{
        	inputName.style.border = "1px solid red";
        	spanName.style.color = "red";
        	spanName.style.fontSize = "12px";
        	spanName.innerHTML = "*поле должно быть заполнено как на примере:" +"<br/>" + "Иван, Ivan, иван, ivan";
        }

        // =====ПРОВЕРКА E-MAIL=====
		var spanMail = document.getElementsByTagName("span")[1];
		var inputMail = document.getElementsByTagName("input")[1];
		var userMail = inputMail.value;
		var patternMail = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
        var textMail = patternMail.test(userMail);
        if(textMail){
        	inputMail.style.border = "1px solid green";
        	spanMail.style.color = "green";
        	spanMail.style.fontSize = "24px";
        	spanMail.style.marginBottom = "10px";
			spanMail.innerHTML = "✔";
			end();
		}else{
        	inputMail.style.border = "1px solid red";
        	spanMail.style.color = "red";
        	spanMail.style.fontSize = "12px";
        	spanMail.innerHTML = "*поле должно быть заполнено как на примере:" +"<br/>" + "ivanov.ivan@example.com";
        }

        // =====ПРОВЕРКА ТЕЛЕФОНА=====
		var spanTel = document.getElementsByTagName("span")[2];
		var inputTel = document.getElementsByTagName("input")[2];
		var userTel = inputTel.value;
		var patternTel = /\d{3}-\d{3}-\d{2}-\d{2}/;
        var textTel = patternTel.test(userTel);
        if(textTel){
        	inputTel.style.border = "1px solid green";
        	spanTel.style.color = "green";
        	spanTel.style.fontSize = "24px";
        	spanTel.style.marginBottom = "10px";
			spanTel.innerHTML = "✔";
			end();
        } else{
        	inputTel.style.border = "1px solid red";
        	spanTel.style.color = "red";
        	spanTel.style.fontSize = "12px";
        	spanTel.innerHTML = "*поле должно быть заполнено как на примере:" +"<br/>" + " 093-256-07-50";
        } 
        
        //Вывод на экран введенных данных в случае правильного заполнения формы
        //Также сброс введенных значений  инпутов  
        function end() {
        	if ( textName + textMail + textTel == 3) {
				inputName.value = "";
        		inputMail.value = "";
        		inputTel.value = "";
        		var div = document.getElementById("div__form");
        		div.innerHTML =  "<p> <strong> Ваше имя  </strong>: " + userName + "<br/>" + "<strong> Ваш e-mail  </strong>: " + userMail + "<br/>" + "<strong> Ваш телефон: </strong>" + userTel + "</p>";
        		
        	} else return;
        }
    }   
}