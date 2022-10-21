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
	'view the source code <a href="https://github.com/aljedaxi/daxi.ml">here</a>',
	'i wish i could write something that wasn\'t secretly an ad',
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
				<h2>good articles:</h2>
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
					<li>this is my personal website.</li>
					<li><a href="/collections/books">i've put up a list of most of the books i own</a></li>
					<li><a href="/collections/my-works">stuff scattered about the web are collected here.</a></li>
					<li>of yet, i've given <a href="/collections/talk-stuff/react-advanced-2022/">one big conference talk</a>.</li>
				</ul>
			</main>
			<script dangerouslySetInnerHTML={{__html: `document.querySelector('#title').innerHTML = ${JSON.stringify(titles)}[Math.floor(Math.random() * ${titles.length})]`}}></script>
		</body>
	)
}
