import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import footnote from "https://jspm.dev/markdown-it-footnote"
import anchor from "https://jspm.dev/markdown-it-anchor"
import toc from "https://jspm.dev/markdown-it-table-of-contents"
import {readLines} from "https://deno.land/std@0.154.0/io/buffer.ts"
import relations from "lume/plugins/relations.ts"

const ndjsonLoader = async function*(path: string) {
	for await (const l of readLines(await Deno.open(path))) {
		yield JSON.parse (l)
	}
}

const markdown = {
	plugins: [
		footnote,
		[toc, {
			listType: 'ol',
			containerHeaderHtml: '<h2>table of contents</h2>',
			markerPattern: /^\[\[tableofcontents\]\]/im,
			includeLevel: [1,2,3],
		}],
		[anchor, {
			level: [1,2,3],
		}],
	],
	keepDefaultPlugins: true,
}
const site = lume({src: './src', location: new URL('https://daxi.ml')}, {markdown});
site.loadData (['.ndjson'], ndjsonLoader)
site.copy ('public')
site.use (jsx ({}))
site.use (relations ({
	foreignKeys: {
		slides: 'slides_id',
		talk: 'talk_id',
	},
	onlyData: true,
}))

export default site;
