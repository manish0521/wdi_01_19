// A program in chunks

// ajax(..) is some arbitrary Ajax function given by a library
var data = ajax( "http://some.url.1" );

console.log( data );
// Oops! `data` generally won't have the Ajax results

// Standard Ajax requests don't complete synchronously, which means the ajax(..) function does not yet have any value to return back to be assigned to data variable. If ajax(..) could block until the response came back, then the data = .. assignment would work fine.

// To wait until later we can use function commonly called a callback
// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", function myCallbackFunction(data){

	console.log( data ); // We got some `data`!
});

// Warning: it's possible to make synchronous Ajax requests. While that's technically true, you should never, ever do it, under any circumstances, because it locks the browser UI (buttons, menus, scrolling, etc.) and prevents any user interaction whatsoever.


// example:
function now() {
	return 21;
}

function later() {
	answer = answer * 2;
	console.log( "Meaning of life:", answer );
}

var answer = now();

setTimeout( later, 1000 ); // Meaning of life: 42

// there are two chunks:
// now
function now() {
	return 21;
}

function later() { .. }

var answer = now();

setTimeout( later, 1000 );

// later
answer = answer * 2;
console.log( "Meaning of life:", answer );


// Event Loop
// Event loop is a mechanism that handles executing multiple chunks of your program over time, at each moment invoking the JS engine.
// For example, when your JS program makes an Ajax request to fetch some data from a server, you set up the "response" code in a function (commonly called a "callback"), and the JS engine tells the hosting environment, "Hey, I'm going to suspend execution for now, but whenever you finish with that network request, and you have some data, please call this function back."

// Example:
// `eventLoop` is an array that acts as a queue (first-in, first-out)
var eventLoop = [ ];
var event;

// keep going "forever"
while (true) {
	// perform a "tick"
	if (eventLoop.length > 0) {
		// get the next event in the queue
		event = eventLoop.shift();

		// now, execute the next event
		try {
			event();
		}
		catch (err) {
			reportError(err);
		}
	}
}

// This is vastly simplified pseudocode to illustrate the concepts.