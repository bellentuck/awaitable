/* global describe it */

const { expect } = require(`chai`)
const async = require(`../async`)

describe(`The "async" wrapper function`, () => {
  describe(`Inputs`, () => {
    it(`Takes a single argument, a function`, () => {
      const err = `The async function takes a single argument, a function`
      expect(async(() => {})).not.to.throw()
      expect(async()).to.throw(err)
      expect(async(`bruegel`)).to.throw(err)
    })
  })
})
