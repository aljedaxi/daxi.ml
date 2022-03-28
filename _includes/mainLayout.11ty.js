const {articleMeta} = require ('./citation')
const rssFeedLink = `<link rel='alternate' type='application/rss+xml' href='/feed.xml' title='rss feed'/>`

const render = props => {
	const {content, title} = props
	return `
		<!doctype html>
		<html>
			<head>
				<style>a{color:#de0000}</style>
				<title>${title}</title>
				<link rel='icon' href='/favicon.ico' sizes='any'>
				${rssFeedLink}
				${articleMeta (props)}
			</head>
			<body>
				${content}
			</body>
		</html>
	`
}

module.exports = {render}
