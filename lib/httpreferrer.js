/*
httpreferrer
returns a 32-character hash of a URL passed as the referrer of an HTTP request header
*/

'use strict'

const
  url = require('url')
const crypto = require('crypto')

module.exports = (req) => {
  const
    r = url.parse(req.headers.referer || '')
  const ref = r.href ? r.protocol + r.host + r.pathname : null

  return ref ? crypto.createHash('md5').update(ref).digest('hex') : null
}
