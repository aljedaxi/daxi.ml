export default props => {
	const {content, title, bg} = props
	const backgroundImage = bg?.image ?? bg
	const otherStyleStuff = bg?.image ? Object.entries(bg)?.map(([k,v]) => `background-${k}:${v}`).join(';') : ''
	const style = `body{background-image:url(${backgroundImage ?? '/public/favicon.ico'});${otherStyleStuff}}`
	return `
		<!doctype html>
		<html>
			<head>
				<meta charset='utf-8'/>
				<link rel='icon' href='/public/favicon.ico' sizes='any'>
				<link rel="stylesheet" href="/public/slideBase.css" />
				<style>${style}</style>
				<script type='module' src='/public/slideify.js'></script>
			</head>
			<body>
				${content}
			</body>
		</html>
	`
}
