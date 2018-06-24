/* global describe it */

const { expect } = require(`chai`)
const async = require(`../async`)
const awaitable = require(`../awaitable`)

describe(`The "async" wrapper function`, () => {
  describe(`Inputs`, () => {
    it(`Takes a single argument, a function`, () => {
      const err = `The async function takes a single argument, a function`
      expect(() => async(function(){}).not.to.throw())
      expect(async).to.throw(err)
      expect(() => async(`bruegel`)).to.throw(err)
    })
  })

  describe(`Outputs`, () => {
    it(`Returns a function`, () => {
      expect(async(function(first, second){
        return first * second
      })).to.be.a(`function`)
    })

    it(`Returns a wrapped version of the input function`, () => {
      const inputFn = function() {
        const res = awaitable(Promise.resolve(1))
        console.log(res)
      }
      const outputFn = async(inputFn)

      //expect(outputFn(1).next().value).to.equal(1)
    })
  })
})
