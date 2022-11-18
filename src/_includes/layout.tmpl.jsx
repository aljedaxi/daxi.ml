export const layout = 'mainLayout.tmpl.js'
export default props => {
	const {title, children, published, tags, ver} = props
	const isPoem = new Set(tags).has('poetry')
	return (
		<>
			<link rel='stylesheet' href='/public/article.css'/>
			<article itemScope itemType='http://schema.org/BlogPosting' className='wrapper'>
				<header style={{display: 'grid', gridTemplateColumns: '2.4142135623fr 1fr'}}>
					<h1 style={{margin: 0, gridColumn: 'span 2'}}>
						<cite itemProp='headline'>
							{title}
						</cite>
					</h1>
					{
						published 
							? <time itemProp='datePublished' dateTime={new Date (published).toISOString()}>published {new Date (published).toISOString().split('T')[0]}</time>
							: ''
					}
					<span>
						{ver && ver !== 1 ? `version ${ver}` : ''}
					</span>
					<ul className="csv">{tags.map (t => <li><a href={`/tag/${t}`}>{t}</a></li>)}</ul>
				</header>
				<main>
					{children}
				</main>
				<footer>
					<a href="/">esc</a>
				</footer>
			</article>
		</>
	)
}
