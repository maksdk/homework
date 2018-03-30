"use string"
var pow = require("./pow.js");

var chai = require("chai");
var expect = chai.expect;

describe("Функция возводит число в степень", function(){
	describe("Возводим числа в степени 2,3,4 для проверки положительного результата", function(){
		function powTwo(x, n){
			if(n = 2) {var expectResult = x * x ;}
			else if(n = 3){ var expectResult = x * x * x ;}
			else if(n = 4) {var expectResult = x * x * x * x;}
      		it("При возведении " + x + " в степень " + n + " результат: " + expectResult, function() {
		        expect(pow(x, n)).to.be.equal(expectResult);
		    });
		}
		for (var n = 2; n <=4; n++) {
			for (var x = 2; x <= 5; x++) {
				powTwo(x,n);
			}
		}
		
	});

	describe("Возводим числа в дробную степень, результат - NaN", function(){
		function powFraction(x){
      		it("При возведении " + x + " в степень 2.2 результат - NaN ", function() {
		        expect(pow(x, 2.2)).to.be.NaN;
		    });
		}

		for (var x = 1; x <= 5; x++) {
			powFraction(x);
		}
	});

	describe("Возводим числа в отрицательную степень, результат - NaN", function(){
		function powNegative(x){
      		it("При возведении " + x + " в отрицательную степень результат - NaN ", function() {
		        expect(pow(x, -2)).to.be.NaN;
		    });
		}

		for (var x = 1; x <= 5; x++) {
			powNegative(x);
		}
	});

	describe("Возводим числа, кроме числа 0, в степень 0, результат - 1", function(){
		function powZero(x){
      		it("При возведении " + x + " в степень 0 результат - 1 ", function() {
		        expect(pow(x, 0)).to.be.equal(1);
		    });
		}

		for (var x = 1; x <= 5; x++) {
			powZero(x);
		}
	});

	it('Возводим 0 в степень 0, результат - felse', function(){
		expect(pow(0, 0)).to.be.NaN;
	});

	it('Данные могут быть введенны в виде строк', function(){
		expect(pow("5", "2")).to.be.equal(25);
	});

	it('Данные не могут быть введенны буквами, результат - NaN', function(){
		expect(pow("NaN", 5)).to.be.NaN;
	});

	it('Данные не могут быть введенны буквами, результат - NaN', function(){
		expect(pow(3, "NaN")).to.be.NaN;
	});
});