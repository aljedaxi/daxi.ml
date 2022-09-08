import {articleMeta} from './citation.js'
const rssFeedLink = `<link rel='alternate' type='application/rss+xml' href='/feed.xml' title='rss feed'/>`

const socials = ['https://twitter.com/aljedaxi/', 'https://github.com/aljedaxi/', 'mailto:alje@daxi.ml']

export default props => {
	const {content, title} = props
	return `
		<!doctype html>
		<html>
			<head>
				<meta charset='utf-8'/>
				<title>${title}</title>
				<link rel='icon' href='/public/favicon.ico' sizes='any'>
				${rssFeedLink}
				${articleMeta (props)}
				${socials.map (href => `<link href="${href}" rel="me">`).join('')}
				<link rel="webmention" href="https://webmention.io/daxi.ml/webmention" />
				<link rel="pingback" href="https://webmention.io/daxi.ml/xmlrpc" />
				<title>${title}</title>
				<style>
					body{background-image:url(/public/favicon.ico);background-size:1200px}
					body>*{background-color:black;color:white;width:fit-content;padding: 8px;}
					a{color:#d2738a}
				</style>
			</head>
			<body>
				${content}
			</body>
		</html>
	`
}
