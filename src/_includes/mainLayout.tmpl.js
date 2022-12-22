import {articleMeta} from './citation.js'
const rssFeedLink = `<link rel='alternate' type='application/rss+xml' href='/feed.xml' title='rss feed'/>`

const socials = ['https://twitter.com/aljedaxi/', 'https://github.com/aljedaxi/', 'mailto:alje@daxi.ml']

export default props => {
	const {content, title, sheets = [], scripts = []} = props
	return `
		<!doctype html>
		<html>
			<head>
				<meta charset='utf-8'/>
				${sheets.map(filename => `<link rel="stylesheet" href="/public/${filename}" />`)}
				${scripts.map(filename => `<script type='module' src="/public/${filename}" ></script>`)}
				<title>${title}</title>
				<link rel='icon' href='/public/favicon.ico' sizes='any'>
				${rssFeedLink}
				${articleMeta (props)}
				${socials.map (href => `<link href="${href}" rel="me">`).join('')}
				<link rel="webmention" href="https://webmention.io/daxi.ml/webmention" />
				<link rel="pingback" href="https://webmention.io/daxi.ml/xmlrpc" />
				<link rel="stylesheet" href="/public/daxi.css" />
				<title>${title}</title>
			</head>
			<body>
				${content}
			</body>
		</html>
	`
}
