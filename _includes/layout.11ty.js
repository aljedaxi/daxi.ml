const fullBleed = `.wrapper {display: grid; grid-template-columns: 1fr min(70ch, 100%) 1fr; } .wrapper > * { grid-column: 2; } .full-bleed { width: 100%; grid-column: 1 / 4;}`
const style = [fullBleed, `a {color: #de0000}`].join ('\n')
const Main = props => {
	const {title, content, date, genre, ver} = props
	return (`
		<!doctype html>
		<html>
			<head>
				<title>${title}</title>
				<style>${style}</style>
			</head>
			<body>
				<main class='wrapper'>
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
