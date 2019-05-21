/**
 * Syntax:
 * var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
 * return element for new_array
 * }[, thisArg])
 * 
 * Parameters
 * callback
 * Function that produces an element of the new Array, taking three arguments:
 * ** currentValue
 * *** The current element being processed in the array.
 * ** index(Optional)
 * *** The index of the current element being processed in the array.
 * ** array(Optional)
 * *** The array map was called upon.
 * ** thisArg(Optional)
 * *** Value to use as this when executing callback.
 * 
 * Return value
 * A new array with each element being the result of the callback function and flattened to a depth of 1.
 */

/**
 * Examples
 */

 // 1
let arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// only one level is flattened
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]


// 2
let arr1 = ["it's Sunny in", "", "California"];

arr1.map(x => x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap(x => x.split(" "));
// ["it's","Sunny","in", "", "California"]


// 3
// Let's say we want to remove all the negative numbers and split the odd numbers into an even number and a 1
let a = [5, 4, -3, 20, 17, -33, -4, 18]
//       |\  \  x   |  | \   x   x   |
//      [4,1, 4,   20, 16, 1,       18]

a.flatMap( (n) =>
            (n < 0)      ? []  :
            (n % 2 == 0) ? [n] :[n-1, 1]
)
// expected output: [4, 1, 4, 20, 16, 1, 18]

/**
 * Alternative
 */

var arr1 = [1, 2, 3, 4];

arr1.flatMap(x => [x * 2]);

// is equivalent to
arr1.reduce((acc, x) => acc.concat([x * 2]), []);
// [2, 4, 6, 8]

/**
 * Does not support by IE, Edge and Samsung Internet Android
 */