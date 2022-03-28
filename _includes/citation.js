const {isLeft, encase, pipe, map, joinWith, Right, rights, either, K} = require ('sanctuary')
const {minify} = require ('./css')
const {formatISOWithOptions} = require ('date-fns/fp')
const coolFormat = encase (formatISOWithOptions ({representation: 'date'}))

const dcDate = date => ({'DC.date': {content: date}})

const formatAsMeta = pipe ([
	Object.entries,
	map (
		([k, o]) => `<meta name="${k}" ${Object.entries (o).map (([k, v]) => `${k}="${v}"`).join (' ')}/>`
	),
	joinWith ('\n'),
])

const articleMeta = props => {
	const {title, published} = props
	if (!title || (typeof published === 'string')) return ''
	return `
		<link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
		${formatAsMeta ({
			'DC.title': {content: title, lang: 'en'},
			'DC.language': {content: 'EN_CA'},
			'DC.creator': {content: 'daxi.ml'},
			'DC.audience': {content: 'fun and nice people'},
			'DC.license': {content: peerProductionURI},
			'DC.rights': {content: peerProductionURI},
			...either (K ({})) (dcDate) (coolFormat (published)),
		})}
	`
}
// TODO https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#http://purl.org/dc/terms/educationLevel
// TODO https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#http://purl.org/dc/terms/tableOfContents

const peerProductionURI = 'https://github.com/aljedaxi/peer_production_license/blob/master/plain_text.txt'

module.exports = {peerProductionURI, articleMeta}
