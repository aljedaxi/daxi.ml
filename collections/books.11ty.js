const render = async props => {
	const {jsonl} = props

	const listOfBooks = []
	for await (const o of jsonl()) {
		const {name, sub_title, by, publish_date, subjects = [], otherLinks, numberOfPages, description} = o
		const dBlock = description ? `<p>${description}</p>` : ''
		const metadata = `<dl>${describe ({
			by,
			pages: numberOfPages,
			...(subjects.length ? {tags: subjects.map (s =>`<ul>${s}</ul>`).join ('')} : {}),
			...(otherLinks.length ? {'further reading': otherLinks.map (s =>`<ul>${s}</ul>`).join ('')} : {}),
		}).map (s => `\t\t\t\t\t\t\t${s}`).join ('')}</dl>`
		const heading = `<h2>${name}${sub_title ? `<br/>${sub_title}` : ''} — ${publish_date}</h2>`
		listOfBooks.push(`<li>${heading}${dBlock}${metadata}</li>`)
	}

	return (`
		<body>
			<h1>these are the books i own</h1>
			<p>as you can see, i have too many. take some off my hands.</p>
			<p>if you're ken to computation, check out <a href="/books.jsonl">the raw data</a></p>
			<ul>
				${listOfBooks.join('\n')}
			</ul>
		</body>
	`)
}

module.exports = {
	data: {"layout":"layout.11ty.js","published":"2022-09-06","updated":"2022-09-06","title":"books i have","ver":1,"monospaced":"False","tags":[]},
	render,
}
