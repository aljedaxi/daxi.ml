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
module.exports = {render, data: {title: 'daxi.ml'}}
