/**
 * This function allow you to modify a JS Promise by adding some status properties.
 * Based on: http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
 * But modified according to the specs of promises : https://promisesaplus.com/
 *
 * https://ourcodeworld.com/articles/read/317/how-to-check-if-a-javascript-promise-has-been-fulfilled-rejected-or-resolved
 */
function MakeQueriablePromise(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isResolved) return promise

  // Set initial state
  var isPending = true
  var isRejected = false
  var isFulfilled = false

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
      function(v) {
          isFulfilled = true
          isPending = false
          return v;
      },
      function(e) {
          isRejected = true
          isPending = false
          throw e;
      }
  );

  result.isFulfilled = function() { return isFulfilled }
  result.isPending = function() { return isPending }
  result.isRejected = function() { return isRejected }
  return result
}


const waitForPromiseToResolve = require('./waitForPromiseToResolve');



const awaitable = promise => {

  const queriablePromise = MakeQueriablePromise(promise);

  const gen = function *(asyncOp) { yield asyncOp }

  const iter = gen(queriablePromise)

  // const { value, done } = iter.next()

  // if (!done) {
  //   awaitable(value)
  // }

  // return value

  function doNext(data) {
    let { value, done } = iter.next(data)
    if (!done) {
      //console.log('GOT HERE', value.isPending())
      while (value.isPending()) {
        //value.then(doNext)
        console.log('GOT HERE', value.isPending())
        // value = waitForPromiseToResolve(value)
        // console.log('VALUE: ', value)
        // process.nextTick(() => {
        //   console.log('next tick cb', value.isPending())
        // })
        continue
      }
      console.log('GOT HERE????')
      value.then(doNext)
    }
    else return value
  }
  return doNext()

}

module.exports = awaitable



function sleep(miliseconds, promise) {
  var currentTime = new Date().getTime()

  while (currentTime + miliseconds >= new Date().getTime()) {
    if (promise.isFulfilled()) return promise
  }
  console.log(promise.isFulfilled())
}
