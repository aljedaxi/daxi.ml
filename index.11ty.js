const {map, pipe, keys, joinWith} = require ('sanctuary')
const neq = x => y => x != y
const isntThisFile = p => p.fileSlug !== 'index'
const joinyMap = f => pipe ([
	map (f),
	joinWith ('\n'),
])
const render = props => {
	const {title, content, date, genre, ver, collections} = props
	const tags = keys (collections).filter (neq ('all'))
	return (`
		<!doctype html>
		<html>
			<head>
				<title>${title}</title>
				<style>
					body{background-image:url(/favicon.ico);background-size:150px}
					main>*{background-color:black;color:white;width:fit-content;padding:8px}
					a{color:#d2738a}
				</style>
			</head>
			<body>
				<main>
					<h1><a href="/">daxi.ml</a>: a cool site for cool cats</h1>
					<h2>made by me!!!! i have over 9000 verified fans!!</h2>
					<p>
						Check out some cool text based content:
						<ul>
							${joinyMap (tag => (`
								<li>
									${tag}
									<ul>
										${joinyMap (({url, data: {title}}) => (`
											<li>
												<a href="${url}">${title}</a>
											</li>
										`)) (collections[tag])}
									</ul>
								</li>
							`)) (tags)}
						</ul>
					</p>
				</main>
			</body>
		</html>
	`)
}
module.exports = {
	data: {title: 'daxi.ml', layout: 'mainLayout.11ty.js'},
	render, 
}
