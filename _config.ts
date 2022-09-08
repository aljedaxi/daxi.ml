import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import footnote from "https://jspm.dev/markdown-it-footnote"
import anchor from "https://jspm.dev/markdown-it-anchor"
import toc from "https://jspm.dev/markdown-it-table-of-contents"

const markdown = {
	plugins: [
		footnote,
		[toc, {
			listType: 'ol',
			containerHeaderHtml: '<h2>table of contents</h2>',
			markerPattern: /^\[\[tableofcontents\]\]/im,
			includeLevel: [1,2],
		}],
		[anchor, {
			level: [1,2],
		}],
	],
	keepDefaultPlugins: true,
}
const site = lume({src: './src', location: new URL('https://daxi.ml')}, {markdown});
site.copy ('public')
site.use (jsx ({}))

export default site;
