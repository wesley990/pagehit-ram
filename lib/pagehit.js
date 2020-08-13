/*
page hit object
call count() method to increment counter and return total hits

Count data is stored in memory.
*/
import httpReferrer from './httpreferrer'

export default class {
  // initialize
  constructor () {
    // counter storage
    this.counter = {}
  }

  // increase URL counter
  count (req) {
    const hash = httpReferrer(req)
    if (!hash) return null

    // define count default
    this.counter[hash] = this.counter[hash] || 0

    // return incremented count
    return ++this.counter[hash]
  }
}
