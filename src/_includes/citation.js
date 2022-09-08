import {map} from '../index.tmpl.jsx'
const coolFormat = s => new Date (s).toISOString()
const pipe = fs => x => fs.reduce ((y, f) => f (y), x)
const joinWith = s => xs => xs.join (s)

const dcDate = date => ({'DC.date': {content: date}})

const formatAsMeta = pipe ([
	Object.entries,
	map (
		([k, o]) => `<meta name="${k}" ${Object.entries (o).map (([k, v]) => `${k}="${v}"`).join (' ')}/>`
	),
	joinWith ('\n'),
])

export const articleMeta = props => {
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
			...coolFormat (published) ? dcDate (published) : {},
		})}
	`
}
// TODO https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#http://purl.org/dc/terms/educationLevel
// TODO https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#http://purl.org/dc/terms/tableOfContents

export const peerProductionURI = 'https://github.com/aljedaxi/peer_production_license/blob/master/plain_text.txt'
