---
layout: layout.11ty.js
published: 2022-07-14
title: react is still a library lol
ver: 1
tags:
  - post
  - react
  - programming
---

the adage i most often hear is "you call a library; a framework calls you (your code)" (which more of a heuristic than a definition). let's roll with that.

here's the `index.js` of a new `create-react-app` app:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot (document.getElementById ('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

```

here i'm calling `createRoot.render`; implicitly calling `createElement` on `App` through JSX; and any other components that are pulled into the system are pulled in by being explicitly called by `App`. i'd say that i'm calling everything called here.

as for hooks,

```js
import {useEffect} from 'react'

const C = props => {
  useEffect (() => console.log ('i rendered'), [])
  return null
}
```

i'm passing my little function to `useEffect`. i do get how you could make that case. but thence we'd have to say that
* ramda (`any (x => x < 2) (xs)`), or
* sanctuary (`lift2 (add) (Just (2)) (Just (2))`), or
* lodash (`_.debounce (x => y => y, 300)`)
are all frameworks, and not libraries.

i do intuit the "spooky action at a distance" part of `useEffect`: you're passing this function off to `useEffect`, to be called at react's leisure. but you know exactly when it'll be called: when the component is rerendered, and when the items in the array change[^1]; by this understanding it's about as spooky as `Array.map`.

that misses the *temporal* distance in "spooky action at a distance". `Array.map (f)` calls `f` as soon as `Array.map` `f` is called. the function is called where it's called. so too with `_.debounce (f, 300) ()`. should you pass `f` to `useEffect`, you defined when and why `f` will be called, but you don't, so to speak, call it. but what's the difference? parentheses?

one could make a stronger case when it comes to "when a component is re-rendered". it's just when that component's state changes, or when any of it's forefathers' states' change. everything propagates through the system quite deterministically. the code that is called is all yours, it's just the question of when. on the one hand, i get where "react is a framework" types are coming from: the unfamiliarity with separating the concerns of "what" and "when" (to put it simply),

on the gripping hand, that means the only framework in question is functional programming.

[^1]: 99% of the "issues" with the `useEffect` model come from either
    * not understanding how equality works in js
    * not specifying everything the function depends upon

## ok well if react isn't a framework than what is?

an app made with `nextjs` doesn't have that clear, user written `import` structure we saw in the `index.js` above. you export code from a file, & `nextjs` interprets it through that code location in the filesystem. that sounds like something calling you.

but there's something a bit more substantial to it. `deno` shows that a codebase doesn't have to be structured via a filesystem; it can just as easily be structured over the network. though the filesystem is of the utmost importance to the programer, or the implementer of the engine for the language, it doesn't really make a difference to js.

`nextjs`, by pulling the filesystem into its model, sits at a level above the "code" in the way that `react` doesn't.

this points at—provokes the thought of—a much larger question as to what code is, &amp;c., and i do fully intend to get to that. until then, check out, uh, <a href="/articles/opinionated-react-project-structure">this article about react ""project" "structure""</a>.

dude i never should have read Heidegger i can't not write like an saucy pedantic wretch anymore
