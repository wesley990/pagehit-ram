/*
httpreferrer
returns a 32-character hash of a URL passed as the referrer of an HTTP request header
*/

'use strict'

import { URL } from 'url'
import { createHash } from 'crypto'

export default (req) => {
  const r = URL(req.headers.referer || '')
  const ref = r.href ? r.protocol + r.host + r.pathname : null
  const cry = createHash('md5').update(ref).digest('hex')
  return ref ? cry : null
}
