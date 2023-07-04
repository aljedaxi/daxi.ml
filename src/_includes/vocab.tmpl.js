import {stringify as s} from "https://deno.land/x/xml/mod.ts"
const people = {
	daxi: {href: 'https://daxi.ml/person/jacob', children: 'jacob whitford-bender'}
}
const body = props => {
	const {children} = props
	return `<body typeof="bibo:Webpage"><article>${children}</article></body>`
}
const datetime = props => {
	const {children, property} = props
	return `<dd property="${property}" dataType="xsd:dateTime" content="${children.toISOString()}">${children.toISOString()}</dd>`
}
const dl = props => {
	const {children} = props
	return `<dl>${
		Object.entries(children)
			.map(([k, v]) => `<dt>${k}</dt>${v.map?.(x => `<dd>${x}</dd>`) ?? `<dd>${v}</dd>`}`)
		}</dl>`
}
const onObj = k => f => o => Object.fromEntries(
	Object.entries(o)[k](f)
)
const mapKeys = f => onObj ('map') (([k, v]) => [f(k), v])
const filterKeys = f => onObj ('filter') (([k, v]) => f (k))
const classify = prefixes => ont => ({'@id': id, '@class': className, ...rest}) => {
	const {'vann:preferredNamespacePrefix': prefix} = ont
	const dePrefix = s => prefixes.reduce((s, [k, v]) => s.replace(`${k}:`, v), s)
	const {label, editorialNote, definition, scopeNote} = mapKeys(k => k.split(':').at(-1))(rest)
	return `
	<section id="${id}" about="[${prefix}:${id}]" typeof="${className}">
		<h3>${label ?? id}</h3>
		${Object.entries({definition, scopeNote, editorialNote})
			.filter(([k, v]) => Boolean(v))
			.flatMap(([k, v]) => a(v).map(v => `<p property="${k}">${typeof(v) === 'string' ? v : s(v)}</p>`))
			.join('')}
		${dl({children: {
			'Subclass of:': `<a rel="rdfs:subClassOf" href="${dePrefix(className)}">${className}</a>`
		}})}
	</section>
	`
}
const a = xs => Array.isArray(xs) ? xs : [xs]
export default props => {
	const {content, mergedKeys, paginate, saerch, tags, books, xml, 'owl:Ontology': ontology, url, date, page, children} = props
	const {
		'vann:preferredNamespacePrefix': prefix,
		author,
		name,
		version,
		created,
		updated,
		class: classes,
		comment,
		...xmlnses
	} = ontology
	const prefixes = Object.entries({
		...mapKeys (k => k.replace('@xmlns:', '')) (
			filterKeys (k => /xmlns/.test(k)) (ontology)
		),
		[prefix]: `https://daxi.ml${url}#`
	})
	return `
		<!doctype html>
		<html prefix="${prefixes.map(([k, v]) => `${k}: ${v}`).join(' ')}">
			<head>
				<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8"/>
				<base href="https://daxi.ml/vocab/${prefix}#"/>
				<link about="#" rel="rdfs:isDefinedBy bibo:uri" href="https://daxi.ml/vocab/{vann:preferredNamespacePrefix}#"/>
				<meta about="#" property="rdfs:label" content="${prefix}"/>
				<link rel="xhv:up" href="https://vocab.methodandstructure.com/"/>
				<title about="#" property="dct:title">${name}</title>
			</head>
			${body({children: `
				<h1>${name}</h1>
				<section about="#" typeof="owl:Ontology">
					<dl>
						<dt>Author</dt>
						<dd><a rel="dct:creator" href="${people[author].href}"><span property="foaf:name">${people[author].children}</span></a></dd>
						<dt>Version</dt>
						<dd property="owl:versionInfo" datatype="xsd:dateTime">${version}</dd>
						<dt>Updated</dt>
						${datetime({property: 'dct:modified', children: new Date(updated)})}
						${datetime({property: 'dct:modified', children: new Date(created)})}
						<dt>Namespace URI</dt>
						<dd><a href="${url}">${url}</a></dd>
						<dt>Preferred Namespace Prefix</dt>
						<dd about="#" property="vann:preferredNamespacePrefix" datatype="xsd:string">${prefix}</dd>
					</dl>
					${a(comment)?.map(s => `<p property="rdfs:comment">${s}</p>`).join('') ?? ''}
				</section>
				<section>
					<h2>Classes</h2>
					${classes?.map(classify(prefixes)(ontology)).join('') ?? ''}
				</section>
			`})}
		</html>
	`
}
