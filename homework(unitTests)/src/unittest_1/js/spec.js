"use strict";

var merge_sort = require('./mergeSort');

var chai = require('chai');
var expect = chai.expect;

describe('Сортировка элементов массива по возростанию', function () {
    var arr = [];
    it("В качестве аргумента функция принимает только массив, передадим массив", function(){
        expect(merge_sort(arr)).to.be.an('array');
    });
    
    describe('Если в качестве аргумента передать не массив, будет - false', function () {
        var typeData; 
        var arg;
         for (var i = 0; i <= 5; i++){
            if(arg == undefined && typeData == undefined){
                typeData = "Undefined" 
            }else if(typeData == "Undefined"){
                arg = "arr";
                typeData = "String"
            }else if(typeData == "String"){
                arg = null;
                typeData = "Null";
            }else if(typeData == "Null") {
                arg = 5;
                typeData = "Number"
            }else if (typeData == "Number"){
                arg = false;
                typeData = "Boolean"
            }else if(typeData == "Boolean"){
                arg = {};
                typeData = "Object"
            } 

            it("Передадим в качестве аргумента - " + typeData + " , результат - false", function(){
                expect(merge_sort(arg)).to.be.equal(false);
            }); 
        }
    });


    describe('Элементы в передаваемом массиве могут быть только цыфры', function () {
        var N =10;
        var testArray = [];
        for(var i = 0; i < N; i++){
            testArray.push(Math.ceil(Math.random() * N));
        }

        var typeElement;
        var element;
         for (var i = 0; i <= 5; i++){
            if(typeElement == undefined){
                typeElement = "Undefined" 
            }else if(typeElement == "Undefined"){
                element = "arr";
                typeElement = "String"
            }else if(typeElement == "String"){
                element = null;
                typeElement = "Null";
            }else if(typeElement == "Null") {
                element = 5;
                typeElement = "Number"
            }else if (typeElement == "Number"){
                element = false;
                typeElement = "Boolean"
            }else if(typeElement == "Boolean"){
                element = {};
                typeElement = "Object"
            } 
            testArray.splice(0,1,element)
            it("Передадим в качестве одного из элементов - " + typeElement + " , результат - NaN", function(){
                expect(merge_sort(testArray)).to.be.NaN;
            }); 
        }
    });

    describe('Функция возвращает отсортированый массив, проверим', function () {
        
        for (var i = 0; i <= 3; i++) {
            var n = 10;
            var testArr = [];
            for(var j = 0; j < n; j++){
                testArr.push(Math.ceil(Math.random() * n));
            }

            it("Передадим неотсортированый массив - " + testArr + ", отсортируем его "
                + "и сравним результат со встроеной функцией sort. Наша функция : "
             + merge_sort(testArr) + " . Встроенная функция : " +   
             testArr.sort(function(a,b){return a - b}) + " .", function(){
                //expect(merge_sort(testArr)).to.be.NaN;
                expect(merge_sort(testArr)).to.include.members(testArr.sort(function(a,b){return a - b}));
            }); 
        }
    });
});