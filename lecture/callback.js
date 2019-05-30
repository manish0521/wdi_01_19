/**
 * A callback is a function that is to be executed after another function has finished executing.
 * In JavaScript, functions are objects. Because of this, functions can take functions as arguments, and can be returned by other functions. Functions that do this are called higher-order functions. Any function that is passed as an argument is called a callback function.
 */

/**
 * Continuations
 */
// A
ajax( "..", function(..){
	// C
} );
// B

// A and B are now
// C is later
// The callback function wraps or encapsulates the continuation of the program.

// A
setTimeout( function(){
	// C
}, 1000 );
// B

// Do A, setup the timeout for 1,000 milliseconds, then do B, then after the timeout fires, do C


/**
 * Sequential Brain
 */


/**
 * Nested/Chained Callbacks
 */

listen( "click", function handler(evt){
	setTimeout( function request(){
		ajax( "http://some.url.1", function response(text){
			if (text == "hello") {
				handler();
			}
			else if (text == "world") {
				request();
			}
		} );
	}, 500) ;
} );

// This kind of code is often called "callback hell," and sometimes also referred to as the "pyramid of doom" (for its sideways-facing triangular shape due to the nested indentation).
// First, we're waiting for the "click" event, then we're waiting for the timer to fire, then we're waiting for the Ajax response to come back, at which point it might do it all again.

// First (now), we:
listen( "..", function handler(..){
	// ..
} );

// Then later, we:
setTimeout( function request(..){
	// ..
}, 500) ;

// Then still later, we:
ajax( "..", function response(..){
	// ..
} );

// And finally (most later), we:
if ( .. ) {
	// ..
}
else ..

// But there's several problems with reasoning about this code linearly in such a fashion.
// First, it's an accident of the example that our steps are on subsequent lines (1, 2, 3, and 4...). In real async JS programs, there's often a lot more noise cluttering things up, noise that we have to deftly maneuver past in our brains as we jump from one function to the next.

// 1
doA( function(){
	doB();

	doC( function(){
		doD();
	} )

	doE();
} );

doF();

// write the order of operations:
doA()
doF()
doB()
doC()
doE()
doD()

// 2
doA( function(){
	doC();

	doD( function(){
		doF();
	} )

	doE();
} );

doB();

// What if doA(..) or doD(..) aren't actually async, the way we obviously assumed them to be? 
// The order is now A -> C -> D -> F -> E -> B

// Previous nested event/timeout/Ajax example without using nesting:
listen( "click", handler );

function handler() {
	setTimeout( request, 500 );
}

function request(){
	ajax( "http://some.url.1", response );
}

function response(text){
	if (text == "hello") {
		handler();
	}
	else if (text == "world") {
		request();
	}
}


/**
 * Trust Issues
 * The mismatch between sequential brain planning and callback-driven async JS code is only part of the problem with callbacks. There's something much deeper to be concerned about.
 */

// A
ajax( "..", function(..){
	// C
} );
// B

// // A and // B happen now, under the direct control of the main JS program. But // C gets deferred to happen later, and under the control of another party -- in this case, the ajax(..) function. In a basic sense, that sort of hand-off of control doesn't regularly cause lots of problems for programs.
// But don't be fooled by its infrequency that this control switch isn't a big deal. In fact, it's one of the worst (and yet most subtle) problems about callback-driven design. It revolves around the idea that sometimes ajax(..) (i.e., the "party" you hand your callback continuation to) is not a function that you wrote, or that you directly control. Many times, it's a utility provided by some third party.
// We call this "inversion of control," when you take part of your program and give over control of its execution to another third party. There's an unspoken "contract" that exists between your code and the third-party utility -- a set of things you expect to be maintained.

// Imagine you're a developer tasked with building out an ecommerce checkout system for a site that sells expensive TVs. You already have all the various pages of the checkout system built out just fine. On the last page, when the user clicks "confirm" to buy the TV, you need to call a third-party function (provided say by some analytics tracking company) so that the sale can be tracked.
// Your code might look like:
analytics.trackPurchase( purchaseData, function(){
	chargeCreditCard();
	displayThankyouPage();
} );

// after some time one customer has had his credit card charged five times for the same product

// to fix this code:
let tracked = false;

analytics.trackPurchase( purchaseData, function(){
	if (!tracked) {
		tracked = true;
		chargeCreditCard();
		displayThankyouPage();
	}
} );

// But then one of your QA engineers asks, "what happens if they never call the callback?" Oops. Neither of you had thought about that.
// You begin to chase down the rabbit hole, and think of all the possible things that could go wrong with them calling your callback. Here's roughly the list you come up with of ways the analytics utility could misbehave:
// Call the callback too early (before it's been tracked)
// Call the callback too late (or never)
// Call the callback too few or too many times (like the problem you encountered!)
// Fail to pass along any necessary environment/parameters to your callback
// Swallow any errors/exceptions that may happen
// ...


/**
 * Not Just Others' Code
 * Think of it this way: most of us agree that at least to some extent we should build our own internal functions with some defensive checks on the input parameters, to reduce/prevent unexpected issues.
 */

function addNumbers(x,y) {
	// + is overloaded with coercion to also be
	// string concatenation, so this operation
	// isn't strictly safe depending on what's
	// passed in.
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// "2121"

// Defensive against untrusted input:
function addNumbers(x,y) {
	// ensure numerical input
	if (typeof x != "number" || typeof y != "number") {
		throw Error( "Bad parameters" );
	}

	// if we get here, + will safely do numeric addition
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// Error: "Bad parameters"

// or even better
function addNumbers(x,y) {
	// ensure numerical input
	x = Number( x );
	y = Number( y );

	// + will safely do numeric addition
	return x + y;
}

addNumbers( 21, 21 );	// 42
addNumbers( 21, "21" );	// 42

// We should do the same thing about composition of async function callbacks, not just with truly external code but even with code we know is generally "under our own control"


/**
 * Trying to Save Callbacks
 */
// For example, regarding more graceful error handling, some API designs provide for split callbacks (one for the success notification, one for the error notification):
function success(data) {
	console.log( data );
}

function failure(err) {
	console.error( err );
}

ajax( "http://some.url.1", success, failure );

// Note: This split-callback design is what the ES6 Promise API uses

// Another common callback pattern is called "error-first style" (sometimes called "Node style," as it's also the convention used across nearly all Node.js APIs), where the first argument of a single callback is reserved for an error object (if any). If success, this argument will be empty/falsy (and any subsequent arguments will be the success data), but if an error result is being signaled, the first argument is set/truthy (and usually nothing else is passed):
function response(err,data) {
	// error?
	if (err) {
		console.error( err );
	}
	// otherwise, assume success
	else {
		console.log( data );
	}
}

ajax( "http://some.url.1", response );

// In both of these cases, several things should be observed.
// First, it has not really resolved the majority of trust issues like it may appear. There's nothing about either callback that prevents or filters unwanted repeated invocations. Moreover, things are worse now, because you may get both success and error signals, or neither, and you still have to code around either of those conditions.
// Also, don't miss the fact that while it's a standard pattern you can employ, it's definitely more verbose and boilerplate-ish without much reuse, so you're going to get weary of typing all that out for every single callback in your application.
// What about the trust issue of never being called? If this is a concern (and it probably should be!), you likely will need to set up a timeout that cancels the event. You could make a utility (proof-of-concept only shown) to help you with that:
function timeoutify(fn,delay) {
	var intv = setTimeout( function(){
			intv = null;
			fn( new Error( "Timeout!" ) );
		}, delay )
	;

	return function() {
		// timeout hasn't happened yet?
		if (intv) {
			clearTimeout( intv );
			fn.apply( this, [ null ].concat( [].slice.call( arguments ) ) );
		}
	};
}

// Here's how you use it:
// using "error-first style" callback design
function foo(err,data) {
	if (err) {
		console.error( err );
	}
	else {
		console.log( data );
	}
}

ajax( "http://some.url.1", timeoutify( foo, 500 ) );

// Another trust issue is being called "too early." In application-specific terms, this may actually involve being called before some critical task is complete. But more generally, the problem is evident in utilities that can either invoke the callback you provide now (synchronously), or later (asynchronously).
// Consider:
function result(data) {
	console.log( a );
}

var a = 0;

ajax( "..pre-cached-url..", result );
a++;

// Will this code print 0 (sync callback invocation) or 1 (async callback invocation)? Depends... on the conditions.

// What if you don't know whether the API in question will always execute async? You could invent a utility like this asyncify(..) proof-of-concept:
function asyncify(fn) {
	var orig_fn = fn,
		intv = setTimeout( function(){
			intv = null;
			if (fn) fn();
		}, 0 )
	;

	fn = null;

	return function() {
		// firing too quickly, before `intv` timer has fired to
		// indicate async turn has passed?
		if (intv) {
			fn = orig_fn.bind.apply(
				orig_fn,
				// add the wrapper's `this` to the `bind(..)`
				// call parameters, as well as currying any
				// passed in parameters
				[this].concat( [].slice.call( arguments ) )
			);
		}
		// already async
		else {
			// invoke original function
			orig_fn.apply( this, arguments );
		}
	};
}

// You use asyncify(..) like this:
function result(data) {
	console.log( a );
}

var a = 0;

ajax( "..pre-cached-url..", asyncify( result ) );
a++;

// Whether the Ajax request is in the cache and resolves to try to call the callback right away, or must be fetched over the wire and thus complete later asynchronously, this code will always output 1 instead of 0Whether the Ajax request is in the cache and resolves to try to call the callback right away, or must be fetched over the wire and thus complete later asynchronously, this code will always output 1 instead of 0