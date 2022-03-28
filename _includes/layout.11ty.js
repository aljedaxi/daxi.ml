const {encase, pipe, map, joinWith, Right, rights, either, K} = require ('sanctuary')
const {minify} = require ('./css')
const {formatISOWithOptions} = require ('date-fns/fp')
const coolFormat = encase (formatISOWithOptions ({representation: 'date'}))

const peerProductionURI = 'https://github.com/aljedaxi/peer_production_license/blob/master/plain_text.txt'

const fullBleed = `
	.wrapper {
		display: grid;
		grid-template-columns: 1fr min(70ch, 100%) 1fr;
	}
	.wrapper > * {
		grid-column: 2;
	}
	.full-bleed {
		width: 100%;
		grid-column: 1 / 4;
	}
`
const footer = `
	footer {
		display: grid;
		grid-auto-flow: column;
	}
	header, footer {
		margin: 5pt 0;
	}
`
const texy = `
	p {
		text-indent: 10pt;
		margin: 0;
	}
`
const trace = s => {console.log(s); return s;};
const style = [fullBleed, footer, texy, `a {color: #de0000}`].join ('\n')
const dcDate = date => ({'DC.date': {content: date}})
const prepareMetadataForZotero = pipe ([
	({title, published, }) => ({
		'DC.title': {content: title, lang: 'en'},
		'DC.language': {content: 'EN_CA'},
		'DC.creator': {content: 'daxi.ml'},
		'DC.audience': {content: 'fun and nice people'},
		'DC.license': {content: peerProductionURI},
		'DC.rights': {content: peerProductionURI},
		...either (K ({})) (dcDate) (coolFormat (published)),
	}),
	Object.entries,
	map (
		([k, o]) => `<meta name="${k}" ${Object.entries (o).map (([k, v]) => `${k}="${v}"`).join (' ')}/>`
	),
	joinWith ('\n'),
])

// TODO https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#http://purl.org/dc/terms/educationLevel
// TODO https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#http://purl.org/dc/terms/tableOfContents
const Main = props => {
	const {title, content, published, tags, ver} = props
	return (`
		<!doctype html>
		<html>
			<head>
				<title>${title}</title>
				<style>${minify (style)}</style>
				<link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
				${prepareMetadataForZotero (props)}
			</head>
			<body>
				<article itemscope itemtype='http://schema.org/BlogPosting' class='wrapper'>
					<header>
						<h1>
							<cite itemprop='headline'>
								${title}
							</cite>
						</h1>
						${
							either (_ => '') (
								s => `<time itemprop='datePublished' datetime='${s}'>published ${s}</time>`
							) (coolFormat (published))
						}
					</header>
					${
						content
							.replace (/---/g, '&mdash;')
						}
					<footer>
						<a href="/">main site</a>
						<a itemprop='license' href="${peerProductionURI}">peer production licensed</a>
					</footer>
				</article>
			</body>
		</html>
	`)
}
module.exports = Main
