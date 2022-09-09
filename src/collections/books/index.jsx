export default async props => {
	const {books} = props
	const lis = []
	for await (const book of books) {
		const {name, subjects, otherLinks, by, description, publish_date: publishDate} = book
		lis.push (
			<li>
				<h2 dangerouslySetInnerHTML={{__html: `${name} &mdash; ${publishDate}`}}/>
				{description ? <p>{description}</p> : null}
				<p dangerouslySetInnerHTML={{__html: `by ${by}`}}/>
				<dl>
					{subjects?.length
						? [
							<dt>subjects</dt>,
							<dd><ul className='csv'>{subjects.map (s => <li>{s}</li>)}</ul></dd>
						]
						: null}
					{otherLinks?.length
						? [
							<dt>other links</dt>,
							<dd><ul className='csv'>{otherLinks.map (s => <li dangerouslySetInnerHTML={{__html: s}}/>)}</ul></dd> 
						]
						: null}
				</dl>
			</li>
		)
	}
	return (
		<body>
			<header>
				<h1>I have more books than i'd ideally like.</h1>
				<p>the other problem is that i want them to have a good home. if you'd like to pore over my collection, now you can! this isn't even all of them!</p>
				<p>i slapped some custom software together to digitize the collection. it's very unix, all streams, but if you'd like to try it out, it's <a href="https://github.com/aljedaxi/isbn-processor">here</a>.</p>
			</header>
			<main>
				<ul>
					{lis}
				</ul>
			</main>
		</body>
	)
}
