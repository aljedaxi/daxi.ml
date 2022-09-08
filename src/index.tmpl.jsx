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
export default props => {
	const {search} = props
	const allPages = search.pages ('post')
	const pagesByTag = allPages.reduce ((map, p) => {
		p.data.tags?.forEach(t => void map.set (t, [...map.get (t) ?? [], p]))
		return map
	}, new Map())
	const allTags = new Set (allPages.flatMap (p => p.data.tags))
	return (
		<body>
			<header id='title'>
				spinner
			</header>
			<main>
				<dl>
					{map(tag => (
						<>
							<dt>
								{tag}
							</dt>
							<dd>
								<ul>
									{map (({src: {path}, data: {title}}) => (
										<li>
											<a href={path}>{title}</a>
										</li>
									)) (pagesByTag.get (tag))}
								</ul>
							</dd>
						</>
					)) (allTags)}
				</dl>
			</main>
			<script dangerouslySetInnerHTML={{__html: `document.querySelector('#title').innerHTML = ${JSON.stringify(titles)}[Math.floor(Math.random() * ${titles.length})]`}}></script>
		</body>
	)
}
