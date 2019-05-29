/**
 * Super and extends(ES6)
 * If we want to extend a class in JavaScript, we can take the help of the keywords super and extends to do so.
 */
class Animal {
    constructor(name, weight) {
        this.name   = name;
        this.weight = weight;
    }

    eat() {
        return `${this.name} is eating!`;
    }

    sleep() {
        return `${this.name} is going to sleep!`;
    }

    wakeUp() {
        return `${this.name} is waking up!`;
    }
}

class Gorilla extends Animal {
    constructor(name, weight) {
        super(name, weight);
    }

    climbTrees() {
        return `${this.name} is climbing trees!`;
    }

    poundChest() {
        return `${this.name} is pounding its chest!`;
    }

    showVigour() {
        return `${super.eat()} ${this.poundChest()}`;
    }

    dailyRoutine() {
        return `${super.wakeUp()} ${this.poundChest()} ${super.eat()} ${super.sleep()}`;
    }
}

function display(content) {
    console.log(content);
}

const gorilla = new Gorilla('George', '160Kg');
display(gorilla.poundChest());
display(gorilla.sleep());
display(gorilla.showVigour());
display(gorilla.dailyRoutine());

// OUTPUT:
// George is pounding its chest!
// George is going to sleep!
// George is eating! George is pounding its chest!
// George is waking up! George is pounding its chest! George is eating! George is going to sleep!

// The Gorilla class is a subclass or child class of Animal and it uses the extends keyword to set itself as a subclass.
// In Gorilla’s constructor super is used as a “function”. Whereas, Gorilla’s showVigour() and dailyRoutine() methods have used super as an “object”.


/**
 * Traditional JavaScript Classes
 * Object-oriented JavaScript did exist and used prototypal inheritance to extend classes.
 */
// Traditional JavaScript syntax(ES5):
function Animal(name, weight) {
    this.name = name;
    this.weight = weight;
}

Animal.prototype.eat = function() {
    return `${this.name} is eating!`;
}

Animal.prototype.sleep = function() {
    return `${this.name} is going to sleep!`;
}

Animal.prototype.wakeUp = function() {
    return `${this.name} is waking up!`;
}


function Gorilla(name, weight) {
    Animal.call(this, name, weight);
}

Gorilla.prototype = Object.create(Animal.prototype);
Gorilla.prototype.constructor = Gorilla;

Gorilla.prototype.climbTrees = function () {
    return `${this.name} is climbing trees!`;
}

Gorilla.prototype.poundChest = function() {
    return `${this.name} is pounding its chest!`;
}

Gorilla.prototype.showVigour = function () {
    return `${Animal.prototype.eat.call(this)} ${this.poundChest()}`;
}

Gorilla.prototype.dailyRoutine = function() {
    return `${Animal.prototype.wakeUp.call(this)} ${this.poundChest()} ${Animal.prototype.eat.call(this)} ${Animal.prototype.sleep.call(this)}`;
}

function display(content) {
    console.log(content);
}

var gorilla = new Gorilla('George', '160Kg');
display(gorilla.poundChest());
display(gorilla.sleep());
display(gorilla.showVigour());
display(gorilla.dailyRoutine());

// OUTPUT:
// George is pounding its chest!
// George is going to sleep!
// George is eating! George is pounding its chest!
// George is waking up! George is pounding its chest! George is eating! George is going to sleep!

// Unfortunately, JavaScript’s underlying functionalities never changed. They always remained the same no matter what features got added to the language. The use of new keywords like class, constructor, super, extends just add syntactic flavor to code so as to make it readable and developer friendly.


/**
 * Comparison Between ES6 And Traditional JavaScript Code
 */
// * Methods As Part Of The Class *

// ES6 style
class Animal {
    // ...
    eat() {
        return `${this.name} is eating!`;
    }

    sleep() {
        return `${this.name} is going to sleep!`;
    }

    wakeUp() {
        return `${this.name} is waking up!`;
    }
    // ...
}

// Traditional style
Animal.prototype.eat = function() {
    return `${this.name} is eating!`;
}

Animal.prototype.sleep = function() {
    return `${this.name} is going to sleep!`;
}

Animal.prototype.wakeUp = function() {
    return `${this.name} is waking up!`;
}

// * Mapping extends To Traditional JavaScript *
// The bigger difference comes when we try to extend the parent class with a subclass. 

// ES6 style
class Gorilla extends Animal {
    constructor(name, weight) {
        super(name, weight);
    }
  //...
}

// Traditional style
function Gorilla(name, weight) {
    Animal.call(this, name, weight);
}

Gorilla.prototype = Object.create(Animal.prototype);
Gorilla.prototype.constructor = Gorilla;
//...

// "extends" keyword takes care of extending the parent class Animal to the subclass in ES6 way, but the "super" keyword is also used here to make sure that Animal class is called via Gorilla’s constructor so as to inherit the characteristics and behaviors of the Animal.
// The "super" keyword is used as a function to call Animal class for initializing Gorilla. Here, "super" is equivalent to Animal.call(this, …).

// * Mapping super To Traditional JavaScript *
// ES6 style
class Gorilla extends Animal {
    constructor(name, weight) {
        super(name, weight);
    }

    showVigour() {
        return `${super.eat()} ${this.poundChest()}`;
    }

    dailyRoutine() {
        return `${super.wakeUp()} ${this.poundChest()} ${super.eat()} ${super.sleep()}`;
    }
    // ...
}

// Traditional style
function Gorilla(name, weight) {
    Animal.call(this, name, weight);
}

Gorilla.prototype = Object.create(Animal.prototype);
Gorilla.prototype.constructor = Gorilla;

Gorilla.prototype.showVigour = function () {
    return `${Animal.prototype.eat.call(this)} ${this.poundChest()}`;
}

Gorilla.prototype.dailyRoutine = function() {
    return `${Animal.prototype.wakeUp.call(this)} ${this.poundChest()} ${Animal.prototype.eat.call(this)} ${Animal.prototype.sleep.call(this)}`;
}
// ...

// The keyword super can also be used as an instance of the parent class and to call Animal class specific details.