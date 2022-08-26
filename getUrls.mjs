import {readLines} from "https://deno.land/std@0.152.0/io/mod.ts"
const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g

for await (const l of readLines(Deno.stdin)) {
  l.match (urlRegex)?.forEach (s => {
    if (s.includes ('yarnpkg') || s.includes ('deno.land') || s.includes ('npmjs.org')) return
    console.log (s.trim ())
  })
}
