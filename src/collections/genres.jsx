import {compareAsc} from 'https://deno.land/x/date_fns@v2.15.0/index.js'
export const layout = 'mainLayout.tmpl.js'
const latest = xs => xs.reduce (compareAsc)
export default function* ({search}) {
	const allPages = search.pages ('post')
	const pagesByTag = allPages.reduce ((map, p) => {
		p.data.tags?.forEach(t => void map.set (t, [...map.get (t) ?? [], p]))
		return map
	}, new Map())
	const allTags = new Set (allPages.flatMap (p => p.data.tags))
	allTags.delete ('post')
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
						{[...allTags].map (tag => (
							<li>{pagesByTag.get (tag).length} posts on/around <a href={`/tag/${tag}/`}>{tag}</a></li>
						))}
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
		yield {
			url: `/tag/${tag}/`,
			title: tag,
			published: '2022-09-08',
			updated: latestPost,
			content: (
				<body>
					<header>All posts on or around {tag}</header>
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
