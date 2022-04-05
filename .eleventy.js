const pluginRss = require ('@11ty/eleventy-plugin-rss')
const markdownIt = require ('markdown-it')

module.exports = eleventyConfig => {
	eleventyConfig.addPlugin (pluginRss)
	eleventyConfig.addPassthroughCopy ({'public': '/'})
	eleventyConfig.setLibrary ('md', markdownIt ({html:true})
		.use (require ('markdown-it-footnote'))
	)
}
