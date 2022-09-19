export const layout = 'mainLayout.tmpl.js'
export default props => {
	const {title, children, published, tags, ver} = props
	return (
		<>
			<link rel='stylesheet' href='/public/article.css'/>
			<article itemscope itemtype='http://schema.org/BlogPosting' class='wrapper'>
				<header>
					<h1>
						<cite itemprop='headline'>
							{title}
						</cite>
					</h1>
					{
						published 
							? <time itemprop='datePublished' datetime={new Date (published).toISOString()}>published {new Date (published).toISOString().split('T')[0]}</time>
							: ''
					}
					<br />
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
