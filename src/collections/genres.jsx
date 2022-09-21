import {compareAsc} from 'https://deno.land/x/date_fns@v2.15.0/index.js'
export const layout = 'mainLayout.tmpl.js'
const latest = xs => xs.reduce (compareAsc)
const specificTitle = {
	post: 'all posts that are like, articles',
	poetry: 'all poems',
}
const specificUhhhh = {
	post: ['', 'posts', ' total'],
	talk: ['', 'conference talks', ' that i\'ve created further readings for'],
	'S tier': ['posts that are', 'S tier'],
	prose: ['works that are written in', 'prose'],
	poetry: ['', 'poems'],
}
export default function* ({search}) {
	const allPages = search.pages ('post')
	const pagesByTag = allPages.reduce ((map, p) => {
		p.data.tags?.forEach(t => void map.set (t, [...map.get (t) ?? [], p]))
		return map
	}, new Map())
	const allTags = new Set (allPages.flatMap (p => p.data.tags))
	yield {
		url: '/tag/index',
		title: 'All Tags',
		published: '2022-09-08',
		updated: '2022-09-08',
		content: (
			<body>
				<header>
					<h1>
						All topics covered
					</h1>
				</header>
				<main>
					<ul>
						{[...allTags].map (tag => {
							const [firstHalf, secondHalf, thirdHalf = null] = specificUhhhh[tag] ?? [
								`posts on/around`,
								tag,
								null
							]
							return <li>{pagesByTag.get (tag).length} {firstHalf} <a href={`/tag/${tag}/`}>{secondHalf}</a>{thirdHalf}</li>
						})}
					</ul>
				</main>
			</body>
		)
	}
	for (const tag of allTags) {
		const taggedPages = pagesByTag.get (tag)
		const latestPost = taggedPages.reduce (
			(acc, {data: {published, updated}}) => latest ([acc, published, updated]),
			new Date ('2022-09-08')
		)
		const title = specificTitle[tag] ?? `All posts on or around ${tag}`
		yield {
			url: `/tag/${tag}/`,
			title: tag,
			published: '2022-09-08',
			updated: latestPost,
			content: (
				<body>
					<header>{title}</header>
					<main>
						<ul>
							{taggedPages.map (({src: {path}, data: {title}}) => (
								<li>
									<a href={path}>{title}</a>
								</li>
							))}
						</ul>
					</main>
				</body>
			)
		}
	}
}
