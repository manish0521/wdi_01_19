let animal    = {}
animal.name   = 'Leo'
animal.energy = 10

animal.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
}

animal.sleep = function (length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
}

animal.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
}

// We need to create more than one animal. Naturally the next step for this would be to encapsulate that logic inside of a function that we can invoke whenever we needed to create a new animal.


/**
 * Functional Instantiation
 */
function Animal (name, energy) {
    let animal    = {}
    animal.name   = name
    animal.energy = energy

    animal.eat = function (amount) {
        console.log(`${this.name} is eating.`)
        this.energy += amount
    }

    animal.sleep = function (length) {
        console.log(`${this.name} is sleeping.`)
        this.energy += length
    }

    animal.play = function (length) {
        console.log(`${this.name} is playing.`)
        this.energy -= length
    }

    return animal
}

const leo   = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)


/**
 * Functional Instantiation with Shared Methods
 */
const animalMethods = {
    eat(amount) {
        console.log(`${this.name} is eating.`)
        this.energy += amount
    },
    sleep(length) {
        console.log(`${this.name} is sleeping.`)
        this.energy += length
    },
    play(length) {
        console.log(`${this.name} is playing.`)
        this.energy -= length
    }
}

function Animal (name, energy) {
    let animal    = {}
    animal.name   = name
    animal.energy = energy
    animal.eat    = animalMethods.eat
    animal.sleep  = animalMethods.sleep
    animal.play   = animalMethods.play

    return animal
}

const leo   = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

// By moving the shared methods to their own object and referencing that object inside of our Animal function, we’ve now solved the problem of memory waste and overly large animal objects.


/**
 * Object.create
 */
// Object.create allows you to create an object which will delegate to another object on failed lookups.
// Object.create allows you to create an object and whenever there’s a failed property lookup on that object, it can consult another object to see if that other object has the property.

const parent = {
    name: 'Stacey',
    age: 35,
    heritage: 'Irish'
}
  
const child = Object.create(parent)
child.name  = 'Ryan'
child.age   = 7

console.log(child.name) // Ryan
console.log(child.age) // 7
console.log(child.heritage) // Irish

// Because child was created with Object.create(parent), whenever there’s a failed property lookup on child, JavaScript will delegate that lookup to the parent object. What that means is that even though child doesn’t have a heritage property, parent does so when you log child.heritage you’ll get the parent’s heritage which was Irish.


/**
 * Functional Instantiation with Shared Methods and Object.create
 */
const animalMethods = {
    eat(amount) {
        console.log(`${this.name} is eating.`)
        this.energy += amount
    },
    sleep(length) {
        console.log(`${this.name} is sleeping.`)
        this.energy += length
    },
    play(length) {
        console.log(`${this.name} is playing.`)
        this.energy -= length
    }
}

function Animal (name, energy) {
    let animal    = Object.create(animalMethods)
    animal.name   = name
    animal.energy = energy

    return animal
}

const leo   = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)

// When we call leo.eat, JavaScript will look for the eat method on the leo object. That lookup will fail, then, because of Object.create, it’ll delegate to the animalMethods object which is where it’ll find eat.
// That seems like a common feature that you’d want to be implemented into the language itself. Turns out it is and it’s called - prototype.
// Every function in JavaScript has a prototype property that references an object.

function doThing () {}
console.log(doThing.prototype) // {}

// !!! What if instead of creating a separate object to manage our methods (like we’re doing with animalMethods), we just put each of those methods on the Animal function’s prototype? Then all we would have to do is instead of using Object.create to delegate to animalMethods, we could use it to delegate to Animal.prototype. !!!


/**
 * Prototypal Instantiation
 */
function Animal (name, energy) {
    let animal    = Object.create(Animal.prototype)
    animal.name   = name
    animal.energy = energy

    return animal
}

Animal.prototype.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
}

Animal.prototype.sleep = function (length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
}

Animal.prototype.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
}

const leo   = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)

// All our functionality is still the same but now instead of having to manage a separate object for all the methods, we can just use another object that comes built into the Animal function itself, Animal.prototype.


/**
 * New
 */
// Is JavaScript really that bad that there’s no easier, “built in” way to accomplish the same thing? There is, and it’s by using the "new" keyword.

// Looking back at our Animal constructor, the two most important parts were creating the object and returning it. Without creating the object with Object.create, we wouldn’t be able to delegate to the function’s prototype on failed lookups. Without the return statement, we wouldn’t ever get back the created object.

function Animal (name, energy) {
    let animal    = Object.create(Animal.prototype)
    animal.name   = name
    animal.energy = energy

    return animal
}

// !!! When you invoke a function using the new keyword, those two lines are done for you implicitly (“under the hood”) and the object that is created is called *this*. !!!

function Animal (name, energy) {
    // const this = Object.create(Animal.prototype)

    this.name = name
    this.energy = energy

    // return this
}

Animal.prototype.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
}

Animal.prototype.sleep = function (length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
}

Animal.prototype.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
}

const leo   = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

// The reason this works and that the "this" object is created for us is because we called the constructor function with the "new" keyword. If you leave off "new" when you invoke the function, that "this" object never gets created nor does it get implicitly returned.

function Animal (name, energy) {
    this.name   = name
    this.energy = energy
}

const leo = Animal('Leo', 7)
console.log(leo) // undefined


/**
 * Pseudoclassical Instantiation
 */
class Animal {
    constructor(name, energy) {
        this.name   = name
        this.energy = energy
    }

    eat(amount) {
        console.log(`${this.name} is eating.`)
        this.energy += amount
    }

    sleep(length) {
        console.log(`${this.name} is sleeping.`)
        this.energy += length
    }

    play(length) {
        console.log(`${this.name} is playing.`)
        this.energy -= length
    }
}

const leo   = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

// class is primarily just “syntactical sugar”