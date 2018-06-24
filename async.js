const GeneratorFunction = Object.getPrototypeOf(function *(){}).constructor

const errorMessages = {
  input: `The async function takes a single argument, a function`
}


const async = function() {
  if (arguments.length !== 1 || typeof arguments[0] !== `function`) {
    throw new TypeError(errorMessages.input)
  }

  const awaitableFn = arguments[0]
  let fnSplit = awaitableFn.toString().split(`function`)
  fnSplit.shift() // pop off the "function("
  fnSplit = fnSplit.join(``)
  const args = fnSplit.slice(2, fnSplit.match(/\)/).index).split(',')
  const fn = fnSplit.slice(fnSplit.match(/\)/).index + 1)
  const argsAndFn = args.concat([ fn ])

  console.log('argsAndFn', argsAndFn)

  return new GeneratorFunction(...argsAndFn)


}
//.match(`)`).index


module.exports = async
