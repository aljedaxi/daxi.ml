import CleanCss from 'https://esm.sh/clean-css'
const options = {
	level: {
		2: {
			all: true,
		},
	}
}
const obj = new CleanCss (options)
export const minify = s => obj.minify (s).styles
