export const map = f => xs => {
	const ys = []
	for (const x of xs) {
		ys.push (f (x))
	}
	return ys
}
const joinyMap = f => xs => map (f) (xs).join ('\n')
const titles = [
	'i don\'t think there\'s a single me, you know?',
	'sometimes i feel <a href="https://www.youtube.com/watch?v=t5lKa-a8rPs">i\'ve lived a thousand lives</a>',
	'i am not',
	'i have nothing witty to say. please try again.',
	'welcome to my homepage! you can have fun here!',
	'encoding programs into javascript, epic style',
	'made with <a href="https://lume.land">lume</a>, for fun',
]
export const published = new Date(2022, 3, 21)
export const title = 'daxi.ml'
export const layout = 'mainLayout.tmpl.js'
export const url = '/'
const noShows = new Set (['S tier', 'post'])
export default props => {
	const {search} = props
	const goodPages = search.pages ("'S tier'")
	return (
		<body>
			<header id='title'>
				spinner
			</header>
			<main>
				<h2>These are articles that are good:</h2>
				<ul>
					{map (({src: {path}, data: {title, tags}}) => (
						<li>
							<a href={path}>{title}</a> — <ul aria-label='tags' className='csv'>
								{tags
									.filter (t => !noShows.has (t))
									.map(t => <li><a href={`/tag/${t}`}>{t}</a></li>)}
							</ul>
						</li>
					)) (goodPages)}
				</ul>
				<h2>other things:</h2>
				<ul>
					<li><a href="/collections/books">i digitized my books</a></li>
					<li><a href="/collections/my-works">i have put other stuff together that you can c here</a></li>
				</ul>
			</main>
			<script dangerouslySetInnerHTML={{__html: `document.querySelector('#title').innerHTML = ${JSON.stringify(titles)}[Math.floor(Math.random() * ${titles.length})]`}}></script>
		</body>
	)
}
