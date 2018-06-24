/* global describe it */

const { expect } = require(`chai`)
const awaitable = require(`../awaitable`)

describe(`The "awaitable" async operation wrapper function`, () => {
  it.only(`Should eventually resolve a promise and only then make the rest of a script run`, () => {
    const asyncFn = time => new Promise((resolve, reject) => {
      setTimeout(resolve, time)
    })

    console.log('hey')
    const res = awaitable(asyncFn(100))
    console.log('hi', res)

  })
})

/*
The problem at this point is that we need to get out of the render loop and into the event queue for a Promise to resolve. But we can't get out of the render loop before we execute the rest of the code below an awaitable. So we end up either having to execute everything twice (not what we want), or never being able to access the promise's ability to settle (via the event queue) and remaining instead in perpetual limbo.
*/
