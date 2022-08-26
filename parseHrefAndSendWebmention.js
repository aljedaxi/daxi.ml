import {readLines} from "https://deno.land/std@0.152.0/io/mod.ts"
import {DOMParser} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

const getWebmentionEndpoint = url =>
  fetch (url).then (r => r.text()).then (text => {
    const doc = new DOMParser ().parseFromString (text, 'text/html')
    const href = doc.querySelector ('link[rel="webmention"]')?.getAttribute ('href')
    return href ?? Promise.reject ('no href')
  })

const formBody = o => Object.entries (o)
  .map (([k, v]) => `${encodeURIComponent (k)}=${encodeURIComponent (v)}`)
  .join ('&')

const webMention = ({source, target, endpoint}) => fetch (endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  body: formBody ({source, target})
}).then (r => r.ok ? Promise.resolve ('ok') : Promise.reject (r))
