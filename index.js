// main application
'use strict'

// Node.js modules
import { createServer } from 'http'
import { URL } from 'url'
// HTTP response
import httpResponse from './lib/httpresponse.js'
import Pagehit from './lib/pagehit.js'

// default HTTP port
const port = 3000

// page counter object
const pagehit = new Pagehit()

// new server
createServer((req, res) => {
  // get referring page count
  // console.log(req)
  const count = pagehit.count(req)

  // error: referring page not found
  if (!count) {
    httpResponse({ res, status: 400, content: 'No referrer' })
    return
  }

  // send appropriate response
  const uri = new URL(req.url, `http://${req.headers.host}`).pathname
  switch (uri) {
    // Ajax counter
    case '/counter.json':

      httpResponse({
        res,
        mime: 'application/json',
        content: `{"counter":${count}}`
      })

      break

    // JavaScript document.write() counter
    case '/counter.js':

      httpResponse({
        res,
        mime: 'application/javascript',
        content: `document.write('<span class="pagecounter">${count}</span>');`
      })
      break

    // JavaScript deferred DOM counter
    case '/counter-defer.js':

      httpResponse({
        res,
        mime: 'application/javascript',
        content: `window.addEventListener('DOMContentLoaded',()=>{let c=document.querySelectorAll('script[src$="/counter-defer.js"]');for(let i=0;i<c.length;i++) c[i].insertAdjacentHTML('afterend','<span class="pagecounter">${count}</span>');});`
      })
      break

    // SVG counter
    case '/counter.svg':

      httpResponse({
        res,
        mime: 'image/svg+xml',
        content: `<svg xmlns="http://www.w3.org/2000/svg" width="${String(count).length * 0.6}em" height="1em"><style>text { font-family: sans-serif; font-size: 1em; dominant-baseline: middle; }</style><text y="50%">${count}</text></svg>`
      })
      break

    // error: invalid HTTP request
    default:
      httpResponse({ res, status: 404, content: 'Not found' })
      break
  }
}).listen(port)

console.log(`page hit web service running on port ${port}`)
