const pluginRss = require ('@11ty/eleventy-plugin-rss')
const markdownIt = require ('markdown-it')
const events = require ('events')
const fs = require ('node:fs')
const readline = require ('node:readline')

module.exports = eleventyConfig => {
	eleventyConfig.addPlugin (pluginRss)
	eleventyConfig.addPassthroughCopy ({'public': '/'})
	eleventyConfig.setLibrary (
		'md',
		markdownIt ({html:true})
			.use (require ('markdown-it-footnote'))
			.use (require ('markdown-it-table-of-contents'), {
				listType: 'ol',
				containerHeaderHtml: '<h2>table of contents</h2>',
				markerPattern: /^\[\[tableofcontents\]\]/im,
			})
	)
	eleventyConfig.addDataExtension('jsonl', {
		parser(filename) {
			const rl = readline.createInterface ({
				input: fs.createReadStream (filename),
				crlfDelay: Infinity,
			})
			return {
				jsonl: async function* getLines() {
					for await(const l of rl) {
						yield JSON.parse (l)
					}
				}
			}
		},
		read: false,
	})
}
