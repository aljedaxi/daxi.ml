/** @jsxImportSource jsx */
export const url = '/feed.xml'

const obvious = new Set(['post'])
const FormatItem = ({data}) => <item>
  <title>{data.title}</title>
  <link>{`https://daxi.ml${data.url}`}</link>
  <guid>{`https://daxi.ml${data.url}`}</guid>
  <pubDate>{data.published.toUTCString()}</pubDate>
  {data.tags
    .filter(t => !obvious.has(t))
    .map(category => <category>{category}</category>)
    .join('')}
</item>

const metadata = {
  "title": "daxi.ml",
  "subtitle": "philosophy and high speed computing machines and  and shit lol",
  "url": "http://daxi.ml/",
  "feedUrl": "http://daxi.ml/feed.xml",
  "author": {
    "name": "daxi",
    "email": "alje@daxi.ml"
  }
}
export default props => {
  const {search} = props
  const {title, subtitle, feedUrl, url, author} = metadata
  const realRss = search.pages ('post', 'published=desc')
    .filter(x => x.data.published)
    .sort((x, y) => new Date(y.data.published) - new Date(x.data.published))
    .map(e => <FormatItem {...e}/>)
    .join('')
  const rss = <rss version="2.0">
    <channel>
      <title>{title}</title>
      <description>{subtitle}</description>
      <link>{url}</link>
      <lastBuildDate>{new Date().toUTCString()}</lastBuildDate>
      <language>en-ca</language>
      <copyright>peer production license</copyright>
      <generator>ViperMADEthisBEAt</generator>
      <docs>https://www.rssboard.org/rss-specification</docs>
      {realRss}
    </channel>
  </rss>
  return `<?xml version="1.0" encoding="utf-8"?>${rss}`.trim ()
}
