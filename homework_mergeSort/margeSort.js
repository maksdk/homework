//генератор рандомных чисел в массиве
var N =20;
var testArray = [];
for(var i = 0; i < N; i++){
  testArray.push(Math.ceil(Math.random() * N));
}

let merge_sort = (array) => {
  //проверка на массив
  if(!(Array.isArray(array))) return false;

  //проверка элементов массива на NaN
  for (var i = 0; i < array.length; i++) {
      if(isNaN(array[i]) || 
          array[i] == null || 
          (array[i] == false && array[i]  != 0) || 
          (array[i] == true &&  array[i] != 1) ||
          (array[i] == "" && array[i]  != 0)){
          return NaN;
      }
  }    

  let merge = (left,right) => {
    let result = [];
    while (left.length > 0 && right.length > 0){
      if(left[0] <= right[0]){
        result.push(left.shift());
      }else {
        result.push(right.shift());
      }
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
  }

  let  mergeSort = (array) => {  
    if (array.length < 2) return array;
    
    let middle = Math.floor(array.length /2);
    let leftPart = mergeSort(array.slice(0,middle));
    let rigthPart = mergeSort(array.slice(middle));

    return merge(leftPart, rigthPart);
  }
  return mergeSort(array);
}
var testArray = [1,5,7,9,8,6,3,4,2];
console.log(merge_sort(testArray));


