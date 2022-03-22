const CleanCss = require ('clean-css')
const options = {
	level: {
		2: {
			all: true,
		},
	}
}
const obj = new CleanCss (options)
const minify = s => obj.minify (s).styles
module.exports = {minify}
