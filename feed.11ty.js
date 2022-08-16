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

const render = props => {
  const {collections, metadata} = props
  const {post, posts} = collections
  console.log('post', post);
  return `
    <?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${metadata.title}</title>
      <subtitle>${metadata.subtitle}</subtitle>
      <link href="${metadata.feedUrl}" rel="self"/>
      <link href="${metadata.url}"/>
      <updated>${new Date ().toISOString ()}</updated>
      <id>${metadata.url}</id>
      <author>
        <name>${metadata.author.name}</name>
        <email>${metadata.author.email}</email>
      </author>
      ${post.map (post => `
      <entry>
        <title>${post.data.title}</title>
        <link href="${post.url}"/>
        ${post.updated || post.published
          ? `<updated>${post.updated ?? post.published}</updated>`
          : ''}
        <id>${post.url}</id>
        <content type="html">${post.templateContent}</content>
      </entry>
      `)}
    </feed>
  `.trim ()
}

module.exports = {render, data}
