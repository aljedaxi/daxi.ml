import {readLines} from "https://deno.land/std@0.154.0/io/buffer.ts";

const wrapInGoMaybe = f => (...args) => {
	try {
		const x = f(...args)
		return [x, undefined]
	} catch (e) {
		return [undefined, e]
	}
}

for await (const l of readLines (Deno.stdin)) {
	const [val, err] = wrapInGoMaybe(JSON.parse)(l)
	if (err) throw err
	const {content, properties, uuid} = val
	if (content.startsWith('#')) {
		console.log(`<section id='${uuid}'>\n\n${content}\n</section>`)
	} else {
		console.log(content)
	}
}
