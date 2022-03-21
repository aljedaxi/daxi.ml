const Main = props => {
	const {title, content, date, genre, ver} = props
	return (`
		<!doctype html>
		<html>
			<head>
				<title>${title}</title>
			</head>
			<body>
				<main>
					<h1>${title}</h1>
					${
						content
							.replace (/---/g, '&mdash;')
						}
				</main>
				<footer>
					<a href="/">main site</a>
				</footer>
			</body>
		</html>
	`)
}
module.exports = Main
