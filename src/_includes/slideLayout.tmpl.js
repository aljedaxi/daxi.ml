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
			</head>
			<body>
				${content}
			</body>
			<script>
				const next = f => e => {
					const path = window.location.pathname.split('/')
					const idx = f (parseInt(path.at(-1), 10))
					newPath = \`collections/slides/\${path[3]}/\${idx}\`
					window.location.href = new URL(newPath, window.location.origin)
				}
				const actions = {
					32: next(n => n + 1),
					39: next(n => n + 1),
					37: next(n => n - 1),
				}
				document.body.onkeyup = e => actions[e.keyCode]?.(e)
			</script>
		</html>
	`
}
