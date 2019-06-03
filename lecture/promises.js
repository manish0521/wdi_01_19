/**
 * What is Promise
 * A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.
 */

 /**
  * How Promises Work
  * A promise is an object which can be returned synchronously from an asynchronous function. It will be in one of 3 possible states:
  * Fulfilled: onFulfilled() will be called (e.g., resolve() was called)
  * Rejected: onRejected() will be called (e.g., reject() was called)
  * Pending: not yet fulfilled or rejected
  * 
  * Native JavaScript promises don’t expose promise states. Instead, you’re expected to treat the promise as a black box. Only the function responsible for creating the promise will have knowledge of the promise status, or access to resolve or reject.
  */

// Here is a function that returns a promise which will resolve after a specified time delay:
const wait = time => new Promise((resolve) => setTimeout(resolve, time));

wait(3000).then(() => console.log('Hello!')); // 'Hello!'

// Our wait(3000) call will wait 3000ms (3 seconds), and then log 'Hello!'. All spec-compatible promises define a .then() method which you use to pass handlers which can take the resolved or rejected value.
// The ES6 promise constructor takes a function. That function takes two parameters, resolve(), and reject(). In the example above, we’re only using resolve(), so I left reject() off the parameter list. Then we call setTimeout() to create the delay, and call resolve() when it’s finished.
// You can optionally resolve() or reject() with values, which will be passed to the callback functions attached with .then().
// When I reject() with a value, I always pass an Error object. Generally I want two possible resolution states: the normal happy path, or an exception — anything that stops the normal happy path from happening. Passing an Error object makes that explicit.


/**
 * Important Promise Rules
 * Promises following the spec must follow a specific set of rules:
 * A promise or “thenable” is an object that supplies a standard-compliant .then() method.
 * A pending promise may transition into a fulfilled or rejected state.
 * A fulfilled or rejected promise is settled, and must not transition into any other state.
 * Once a promise is settled, it must have a value (which may be undefined). That value must not change.
 */

// Every promise must supply a .then() method with the following signature:
promise.then(
    onFulfilled?: Function,
    onRejected?: Function
) => Promise

/**
 * The .then() method must comply with these rules:
 * Both onFulfilled() and onRejected() are optional.
 * If the arguments supplied are not functions, they must be ignored.
 * onFulfilled() will be called after the promise is fulfilled, with the promise’s value as the first argument.
 * onRejected() will be called after the promise is rejected, with the reason for rejection as the first argument. The reason may be any valid JavaScript value, but because rejections are essentially synonymous with exceptions, I recommend using Error objects.
 * Neither onFulfilled() nor onRejected() may be called more than once.
 * .then() may be called many times on the same promise. In other words, a promise can be used to aggregate callbacks.
 * .then() must return a new promise, promise2.
 * If onFulfilled() or onRejected() return a value x, and x is a promise, promise2 will lock in with (assume the same state and value as) x. Otherwise, promise2 will be fulfilled with the value of x.
 * If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
 * If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
 * If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
 */


 /**
  * Promise Chaining
  * Because .then() always returns a new promise, it’s possible to chain promises with precise control over how and where errors are handled. Promises allow you to mimic normal synchronous code’s try/catch behavior.
  */

// Like synchronous code, chaining will result in a sequence that runs in serial. In other words, you can do:
fetch(url)
  .then(process)
  .then(save)
  .catch(handleErrors)
;

// Assuming each of the functions, fetch(), process(), and save() return promises, process() will wait for fetch() to complete before starting, and save() will wait for process() to complete before starting. handleErrors() will only run if any of the previous promises reject.

// Here’s an example of a complex promise chain with multiple rejections:
const wait = time => new Promise(
    res => setTimeout(() => res(), time)
  );
  
  wait(200)
    // onFulfilled() can return a new promise, `x`
    .then(() => new Promise(res => res('foo')))
    // the next promise will assume the state of `x`
    .then(a => a)
    // Above we returned the unwrapped value of `x`
    // so `.then()` above returns a fulfilled promise
    // with that value:
    .then(b => console.log(b)) // 'foo'
    // Note that `null` is a valid promise value:
    .then(() => null)
    .then(c => console.log(c)) // null
    // The following error is not reported yet:
    .then(() => {throw new Error('foo');})
    // Instead, the returned promise is rejected
    // with the error as the reason:
    .then(
        // Nothing is logged here due to the error above:
        d => console.log(`d: ${ d }`),
        // Now we handle the error (rejection reason)
        e => console.log(e)) // [Error: foo]
    // With the previous exception handled, we can continue:
    .then(f => console.log(`f: ${ f }`)) // f: undefined
    // The following doesn't log. e was already handled,
    // so this handler doesn't get called:
    .catch(e => console.log(e))
    .then(() => { throw new Error('bar'); })
    // When a promise is rejected, success handlers get skipped.
    // Nothing logs here because of the 'bar' exception:
    .then(g => console.log(`g: ${ g }`))
    .catch(h => console.log(h)) // [Error: bar]
  ;


  /**
   * Error Handling
   */
// Note that promises have both a success and an error handler, and it’s very common to see code that does this:
  save().then(
    handleSuccess,
    handleError
  );
  
// But what happens if handleSuccess() throws an error? The promise returned from .then() will be rejected, but there’s nothing there to catch the rejection — meaning that an error in your app gets swallowed. Oops!
// For that reason, some people consider the code above to be an anti-pattern, and recommend the following, instead:
save()
  .then(handleSuccess)
  .catch(handleError)
;

// The difference is subtle, but important. In the first example, an error originating in the save() operation will be caught, but an error originating in the handleSuccess() function will be swallowed. Image: https://cdn-images-1.medium.com/max/1600/1*5Z_vNz6xHn9mjTgvrqa2Aw.pnghttps://cdn-images-1.medium.com/max/1600/1*5Z_vNz6xHn9mjTgvrqa2Aw.png

// In the second example, .catch() will handle rejections from either save(), or handleSuccess(). Image: https://cdn-images-1.medium.com/max/1600/1*vRaV9sYpYKdxBj3Ld7KM1Q.png

// Of course, the save() error might be a networking error, whereas the handleSuccess() error may be because the developer forgot to handle a specific status code. What if you want to handle them differently? You could opt to handle them both:
save()
  .then(
    handleSuccess,
    handleNetworkError
  )
  .catch(handleProgrammerError)
;

// !!! I recommend ending all promise chains with a .catch(). !!!


/**
 * How to cancel a Promise
 * Here are some common mistakes people make when they roll their own promise cancellation:
 * 1. Adding .cancel() to the promise
 * Adding .cancel() makes the promise non-standard, but it also violates another rule of promises: Only the function that creates the promise should be able to resolve, reject, or cancel the promise. Exposing it breaks that encapsulation, and encourages people to write code that manipulates the promise in places that shouldn't know about it. Avoid spaghetti and broken promises.
 * 2. Forgetting to clean up
 * Some clever people have figured out that there’s a way to use Promise.race() as a cancellation mechanism. The problem with that is that cancellation control is taken from the function that creates the promise, which is the only place that you can conduct proper cleanup activities, such as clearing timeouts or freeing up memory by clearing references to data, etc...
 * 3. Forgetting to handle a rejected cancel promise
 * Did you know that Chrome throws warning messages all over the console when you forget to handle a promise rejection?
 * 4. Rethinking Promise Cancellation
 * Generally, I pass all the information the promise needs to determine how to resolve / reject / cancel at promise creation time. That way, there’s no need for a .cancel() method on a promise. You might be wondering how you could possibly know whether or not you’re going to cancel at promise creation time.
 */

// The value we pass in to represent whether or not to cancel could be a promise itself. Here’s how that might look:
const wait = (
    time,
    cancel = Promise.reject()
) => new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, time);
    const noop = () => {};
  
    cancel.then(() => {
      clearTimeout(timer);
      reject(new Error('Cancelled'));
    }, noop);
});

const shouldCancel = Promise.resolve(); // Yes, cancel
// const shouldCancel = Promise.reject(); // No cancel

wait(2000, shouldCancel).then(
    () => console.log('Hello!'),
    (e) => console.log(e) // [Error: Cancelled]
);

// We’re using default parameter assignment to tell it not to cancel by default. That makes the cancel parameter conveniently optional. Then we set the timeout as we did before, but this time we capture the timeout’s ID so that we can clear it later.
// We use the cancel.then() method to handle the cancellation and resource cleanup. This will only run if the promise gets cancelled before it has a chance to resolve. If you cancel too late, you’ve missed your chance. That train has left the station.

// Note: You may be wondering what the noop() function is for. The word noop stands for no-op, meaning a function that does nothing. Without it, V8 will throw warnings: UnhandledPromiseRejectionWarning: Unhandled promise rejection. It’s a good idea to always handle promise rejections, even if your handler is a noop().