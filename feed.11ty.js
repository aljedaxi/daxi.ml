const data = {
  "permalink": "feed.xml",
  "eleventyExcludeFromCollections": true,
  "metadata": {
    "title": "daxi.ml",
    "subtitle": "philosophy and high speed computing machines and  and shit lol",
    "url": "http://daxi.ml/",
    "feedUrl": "http://daxi.ml/feed.xml",
    "author": {
      "name": "daxi",
      "email": "alje@daxi.ml"
    }
  }
}

const joinMap = f => xs => xs.map (f).join ('')

const formatProps = o => {
  const s = Object.entries (o ?? {}).map (([k, v]) => `${k}="${v}"`).join (' ')
  return s.length ? ` ${s}` : ''
}

const createElement = tag => props => children => {
  const formattedProps = formatProps (props)
  const formattedChildren = Array.isArray (children) ? children.join ('')
    : children.toString                              ? children.toString()
    : ''
  return `<${tag}${formattedProps}>${formattedChildren}</${tag}>`
}

const c = createElement

const getDate = ({data: {title, updated, published, date}}) => 
  updated || published || date ? (updated ?? published ?? date).toISOString () : ''

const formatItem = ({data, url}) => c ('item') () ([
  `<title>${data.title}</title>`,
  `<link>daxi.ml${url}</link>`,
  getDate ({data}) ? c ('updated') () (getDate ({data})) : ''
])
const render = props => {
  const {collections, metadata} = props
  const {post, posts} = collections
  const {title, subtitle, feedUrl, url, author} = metadata
  const rss = c ('rss') ({version: '2.0'}) ([
    c ('channel') () (`
<title>${title}</title>
<description>${subtitle}</description>
<link>${url}</link>
<lastBuildDate>${new Date ().toISOString ()}</lastBuildDate>
<language>en-ca</language>
<copyright>peer production license</copyright>
<generator>ViperMADEthisBEAt</generator>
<docs>https://www.rssboard.org/rss-specification</docs>
${joinMap (formatItem) (post.sort ((p1, p2) => getDate(p1) > getDate(p2)))}
    `)
  ])
  return `<?xml version="1.0" encoding="utf-8"?>${rss}`.trim ()
}

module.exports = {render, data}
