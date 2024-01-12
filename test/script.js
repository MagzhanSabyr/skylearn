

let arr = [5,5,8,9,2,1,4,5,11,254,356,2,3,1,5,8,9,2,1,3,54,12,1,51,51,21,984,84,5,45,4,7] ;
console.log(arr);

for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
        if(arr[i] > arr[j]){
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}





console.log(arr)





