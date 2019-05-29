// Objects are key/value pairs.

/**
 * Syntax
 * objectName.propertyName
 */

let myCar = new Object();
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;

console.log(myCar)
console.log(myCar.color)

// 2 Properties of JavaScript objects can also be accessed or set using a bracket notation
myCar['make']  = 'Ford';
myCar['model'] = 'Mustang';
myCar['year']  = 1969;

// 3
// four variables are created and assigned in a single go, 
// separated by commas
let myObj = new Object(),
    str = 'myString',
    rand = Math.random(),
    obj = new Object();

myObj.type              = 'Dot syntax';
myObj['date created']   = 'String with space';
myObj[str]              = 'String value';
myObj[rand]             = 'Random Number';
myObj[obj]              = 'Object';
myObj['']               = 'Even an empty string';

console.log(myObj);

// 4 
// You can use the bracket notation with for...in to iterate over all the enumerable properties of an object.
function showProps(obj, objName) {
    var result = ``;
  
    for (var i in obj) {
        // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
        if (obj.hasOwnProperty(i)) {
            result += `${objName}.${i} = ${obj[i]}\n`;
        }
    }
 
    return result;
}

// 5.1
// Creating new objects
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

var mycar = new Car('Eagle', 'Talon TSi', 1993);

function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}

var ken = new Person('Ken Jones', 39, 'M');

// 5.2
// Animal properties and method encapsulation
var Animal = {
    type: 'Invertebrates', // Default value of properties
    displayType: function() {  // Method which will display type of Animal
        console.log(this.type);
    }
};

// Create new animal type called animal1 
var animal1 = Object.create(Animal);
animal1.displayType(); // Output:Invertebrates

// Create new animal type called Fishes
var fish = Object.create(Animal);
fish.type = 'Fishes';
fish.displayType(); // Output:Fishes

// 6
// Getters and setters
var o = {
    a: 7,
    get b() { 
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2;
    }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25

var d = Date.prototype;
Object.defineProperty(d, 'year', {
    get: function() { return this.getFullYear(); },
    set: function(y) { this.setFullYear(y); }
});

var now = new Date();
console.log(now.year); // 2000
now.year = 2001; // 987617605170
console.log(now);
// Wed Apr 18 11:13:25 GMT-0700 (Pacific Daylight Time) 2001    

// 7
// Deleting properties
// Creates a new object, myobj, with two properties, a and b.
var myobj = new Object;
myobj.a = 5;
myobj.b = 12;

// Removes the a property, leaving myobj with only the b property.
delete myobj.a;
console.log ('a' in myobj); // yields "false"

// 8
// Comparing Objects
// Two variables, two distinct objects with the same properties
var fruit = {name: 'apple'};
var fruitbear = {name: 'apple'};

fruit == fruitbear; // return false
fruit === fruitbear; // return false
// Two variables, a single object
var fruit = {name: 'apple'};
var fruitbear = fruit;  // assign fruit object reference to fruitbear

// here fruit and fruitbear are pointing to same object
fruit == fruitbear; // return true
fruit === fruitbear; // return true
fruit.name = 'grape';
console.log(fruitbear);    // yields { name: "grape" } instead of { name: "apple" }

// 9
// NameSpaces
// In JavaScript, all the code shares a single global namespace which is simply a single global object that holds all global variables and functions as properties. In the browser this is the window object. This tends to pollute the global scope if you have many objects. In the example below, num, obj, str, total, numr, and sum are all added to the global object:
var num = 5;
var obj = {};
var str = "Good morning";

function sum(x, y){
    total = x + y;
    return total;
}

numr = sum(4, 3);

// Anything that is not properly declared, such as undeclared function variables, also ends up on the global object. In the example above, the identifiers num, obj, str, and sum are properly declared using the var keyword, but the function scoped variable total is missing a var and numr is a misspelling of num. JavaScript will add both total and numr to the global name space, which most likely is not what you want.Anything that is not properly declared, such as undeclared function variables, also ends up on the global object. In the example above, the identifiers num, obj, str, and sum are properly declared using the var keyword, but the function scoped variable total is missing a var and numr is a misspelling of num. JavaScript will add both total and numr to the global name space, which most likely is not what you want.
// Name collisions can be a significant problem in JavaScript. A quick and easy solution is offered by the Namespace Design Pattern. You create a single global object for your application and add all your variables and functions to this object. This allows you to namespace your code, make things tidier, and significantly reduce your chances of naming conflicts with third-party JavaScript libraries

var MYAPP = {};        // our unique namespace  
MYAPP.num = 5;
MYAPP.obj = {};
MYAPP.str = "Good morning";

MYAPP.sum = function(x, y){
    var total = x + y;
    return total;
}

MYAPP.num = MYAPP.sum(4, 3);