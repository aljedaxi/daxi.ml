const pluginRss = require ('@11ty/eleventy-plugin-rss')
const markdownIt = require ('markdown-it')

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
}
