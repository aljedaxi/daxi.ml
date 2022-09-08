import S from 'https://esm.sh/sanctuary'
const {encase, pipe, map, joinWith, Right, rights, either, K} = S
import {minify} from './css.js'

const fullBleed = `
	.wrapper {
		display: grid;
		grid-template-columns: 1fr min(70ch, 100%) 1fr;
		background: white;
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

export {S}
export const layout = 'mainLayout.tmpl.js'
export default props => {
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
					published 
						? `<time itemprop='datePublished' datetime='${new Date (published).toISOString()}'>published ${new Date (published).toISOString().split('T')[0]}</time>`
						: ''
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