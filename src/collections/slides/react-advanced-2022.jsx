const firstList = `const TodoList = props => {
  const {todos} = props
  const [completed, setCompleted] = useState ([])
  const [newTodoName, setNewTodoName] = useState ('')
  const [todoNames, setTodoNames] = useState (todos)
  useEffect (() => setTodoNames (todos), [todos])
  return (
    <ul>
      {todoNames.map ((t, idx) => (
        <Todo
          key={t}
          onNameChange={newName => handleTodoNameChange ({newName, idx})}
        />
      ))}
      <input onChange={e => setNewTodoName (e.target.value)}/>
    </ul>
  )
}`
const fullFirstApp = `const App = props => {
  return (
    <div>
      <h1>My Epic <span class="sm">todo</span>App</h1>
      <TodoList></TodoList>
    </div>
  )
}`
const fullScreen = image => ({image, size: 'cover', repeat: 'no-repeat'})
const slide = ({children, bg, heading}) => ({bg, content: <main>{heading}{children}</main>})
const tree = ({children, heading}) => slide ({
	bg: fullScreen('/public/tree.png'),
	heading,
	children: (
		<pre>
			<code className='language-js'>
				{children}
			</code>
		</pre>
	)
})
const SC = ({children}) => <span class="sm">{children}</span>

const slides = [
	{
		bg: fullScreen('/public/ways-of-seeing.jpeg'),
		content: (
			<main>
				<h1>separating <em>separation of concerns</em></h1>
				<h2>jacob whitford-bender</h2>
			</main>
		)
	},
	{
		bg: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Calgary-2387396_1280.jpg',
		backgroundPosition: 'center',
		content: (
			<main>
				<h1>i live in Calgary, Alberta, Canada</h1>
			</main>
		)
	},
	slide ({
		bg: fullScreen('/public/xMentium.svg'),
		heading: <h1>i work for <a style={{color: '#104799'}}href="https://xmentium.com">xMentium</a></h1>,
		children: <h2>and i'm having a wonderful time.</h2>
	}),
	{
		bg: 'https://64.media.tumblr.com/d2e4f7b8008aa7d42e465aa8f8b18e0a/tumblr_ns7sadI9Pg1rhdp3zo1_1280.png',
		content: (
			<main>
				<h1>my <b>concern</b> is <em>what i'm attempting to do</em></h1>
				<h1>how i accomplish that <em>mirrors</em> my understanding of my concern</h1>
			</main>
		)
	},
	tree ({heading: <h1>a <SC>todo</SC> component</h1>, children: firstList}),
	tree ({heading: <h1>a <SC>todo</SC> app</h1>, children: fullFirstApp}),
	{
		bg: 'https://64.media.tumblr.com/f836276ddd42547520fed8ea9ddd405f/tumblr_nrt9m2R0g61rhdp3zo1_1280.png',
		content: (
			<main>
				<h1>different things do the same thing</h1>
				<h1>the same thing does different things</h1>
			</main>
		)
	},
	{
		bg: 'https://64.media.tumblr.com/47f94452486ed00116a7bab91c9cbb83/tumblr_nnyi5iVFT81rhdp3zo4_1280.jpg',
		content: (
			<main>
				<h1>from <a href="https://www.cs.utexas.edu/users/EWD/transcriptions/EWD04xx/EWD447.html"><em>On the role of scientific thought.</em></a></h1>
				<blockquote style={{maxWidth: '50em'}}>
					a program must be correct and we can study it from that viewpoint only; we also know that it should be efficient and we can study its efficiency on another day ... But nothing is gained ... by tackling these various aspects simultaneously. It is what I sometimes have called "the separation of concerns", which ... is yet the only available technique for effective ordering of one's thoughts ...
				</blockquote>
			</main>
		)
	},
	{
		bg: fullScreen('/public/bur-lain-ga.png'),
		content: (
			<main>
				<h1>in terms of "speed"</h1>
				<h1 style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr', placeItems: 'center'}}>
					<span>assembly</span>
					≥
					<span className="sm">c</span>
					≥
					<span className="sm">js</span>
					≥
					<span>React</span>
				</h1>
			</main>
		)
	},
	{
		bg: fullScreen('/public/bur-lain-ga.png'),
		content: (
			<main>
				<h1>from the <code><a href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction">react-three-fiber</a></code> docs</h1>
				<blockquote>
					<h3>
						Is it slower than plain three.js?
					</h3>
					No ... It outperforms three.js at scale due to React's scheduling abilities.
				</blockquote>
			</main>
		)
	},
	{
		bg: '/public/whither.png',
		content: <main><h1><code>npm i react</code></h1></main>,
	},
	tree ({heading: <h1>a <SC>todo</SC> component</h1>, children: firstList}),
	{
		bg: '/public/whither.png',
		content: <main><h1>state ↦ <span className="sm">ui</span></h1></main>,
	},
	slide ({
		heading: <h1><a href="/collections/talk-stuff/react-advanced-2022/">further reading </a> and image sources:</h1>,
		children: <>
			<h2>Further reading:</h2>
			<a href="/collections/talk-stuff/react-advanced-2022/">
				<img src="/public/react-advanced-further-reading-qr.svg" alt="link to https://daxi.ml/collections/talk-stuff/react-advanced-2022/" />
			</a>
			<h2>Image sources:</h2>
			<ol>
				<li>the picture of calgary is from the calgary wikipedia page and CC</li>
				<li>the everything else is my wacky glitch art. the constituent parts are:</li>
				<li><a href="https://shop.irisdemouy.com/collections/everything/products/starry-eyes">Starry Eyes by iris de mouy</a>, which inspired me to make this talk</li>
				<li><a href="https://www.youtube.com/watch?v=JHc407diipc&list=OLAK5uy_kk8FqYa42ki53eLjkM9J5lUDzf6XXLtUM">Empire Sound by Doldrums</a>, a source of endless inspiration</li>
				<li>xMentium's logo</li>
				<li>an image of <a href="https://www.lainchan.org/">lain</a> from <a href="https://fauux.neocities.org/">fauux.neocities.org</a></li>
			</ol>
			
		</>
	})
]
export const type = 'slides'
export const talk_id = 'react-advanced-2022'
export const id = 'react-advanced-2022'
export const layout = 'slideLayout.tmpl.js'
const relationData = {type, talk_id, id}
export default function* () {
	let idx = 0
	for (const {bg, content} of slides) {
		yield {
			...idx === 0 ? relationData : {},
			url: `./${idx++}/`,
			bg,
			content,
		}
	}
	yield {
		url: `./${idx++}/`,
		content: <main>presentation is super over.</main>,
	}
}
