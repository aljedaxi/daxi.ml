const {encase, pipe, map, joinWith, Right, rights, either, K} = require ('sanctuary')
const {minify} = require ('./css')
const {formatISOWithOptions} = require ('date-fns/fp')
const coolFormat = encase (formatISOWithOptions ({representation: 'date'}))

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
	.sm {
		font-variant: small-caps;
	}
	blockquote {
		margin: 5pt 10pt;
	}
	p {
		text-indent: 10pt;
		margin: 0;
	}
`
const style = [fullBleed, footer, texy].join ('\n')

const render = props => {
	const {title, content, published, tags, ver} = props
	return (`
		<style>${minify (style)}</style>
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
			</footer>
		</article>
	`)
}

module.exports = {
	data: {layout: 'mainLayout.11ty.js'},
	render,
}
