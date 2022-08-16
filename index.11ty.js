const {map, pipe, keys, joinWith} = require ('sanctuary')
const neq = x => y => x != y
const isntThisFile = p => p.fileSlug !== 'index'
const joinyMap = f => pipe ([
	map (f),
	joinWith ('\n'),
])
const titles = [
	'i don\'t think there\'s a single me, you know?',
	'sometimes i feel <a href="https://www.youtube.com/watch?v=t5lKa-a8rPs">i\'ve lived a thousand lives</a>',
	'i am not',
	'i have nothing witty to say. please try again.',
	'welcome to my homepage! you can have fun here!',
]
const render = props => {
	const {title, content, date, genre, ver, collections} = props
	const tags = keys (collections).filter (neq ('all'))
	return (`
		<!doctype html>
		<html>
			<head>
				<title>${title}</title>
				<style>
					body{background-image:url(/favicon.ico);background-size:1200px}
					main>*{background-color:black;color:white;width:fit-content;padding:8px}
					a{color:#d2738a}
				</style>
			</head>
			<body>
				<main>
					<p id='title'>
						spinner
					</p>
					<dl>
						${joinyMap (tag => (`
							<dt>
								${tag}
							</dt>
							<dd>
								<ul>
									${joinyMap (({url, data: {title}}) => (`
										<li>
											<a href="${url}">${title}</a>
										</li>
									`)) (collections[tag])}
								</ul>
							</dd>
						`)) (tags)}
					</dl>
				</main>
			</body>
			<script>document.querySelector('#title').innerHTML = ${JSON.stringify(titles)}[Math.floor(Math.random() * ${titles.length})]</script>
		</html>
	`)
}
module.exports = {
	data: {title: 'daxi.ml', layout: 'mainLayout.11ty.js'},
	render, 
}
