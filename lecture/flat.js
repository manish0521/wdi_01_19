/**
 * The flat() and flatMap() functions are available in Chrome 69 / V8 6.9, so you need Node.js 11.
 * Array#flat() is analogous to Lodash's _.flattenDepth() function. The flat() function takes an array of arrays and "flattens" the nested arrays into the top-level array.
 */

 /**
  * Examples
  */

// 1
[[1, 2], [3, 4], [5, 6]].flat(); 
// [1, 2, 3, 4, 5, 6]

// 2
// By default, flat() only flattens one level deep:

[[[1, 2]], [[3, 4]], [[5, 6]]].flat(); 
// [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]

// 3
// However, flat() takes a depth argument that specifies how many levels down you want to flatten.

[[[1, 2]], [[3, 4]], [[5, 6]]].flat(2); 
// [1, 2, 3, 4, 5, 6]