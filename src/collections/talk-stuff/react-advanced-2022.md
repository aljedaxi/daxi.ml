---
layout: layout.tmpl.jsx
published: 2022-09-21
title: separating separation of concerns
ver: 1
monospaced: False
type: talk
id: react-advanced-2022
slides_id: react-advanced-2022
tags:
  - programming
	- react
  - web development
---

# outline

* intro
* my concern is what i'm attempting to do
* how i accomplish that mirrors my understanding of my concern
	* let's say i'm trying to make a grand TODO app.
		* i choose to understand the concern as a whole as the management of a list of non-interconnected tasks 
		* your understanding is a list so you use a list
		<!-- * `todos.map (p => <Todo key={p.id} {...p}/>)` -->
	* moving a step up, we can see this functionality is embedded in a page with other functionality
		* if i understand my concern as a number of nested sub-concerns, i'll use some sort of tree structure, such as the DOM
* nothing is ever only itself
* but in practice, the job of the programmer isn't just programming. all kinds of other concerns are jostling for attention.
	* how can i ensure the system retains a certain level of performance and functionality?
	* these were the core concerns of Dijkstra when he was writing his seminal paper, *[on the role of scientific thought](https://www.cs.utexas.edu/users/EWD/transcriptions/EWD04xx/EWD447.html)*
	* > a program must be correct and we can study it from that viewpoint only; we also know that it should be efficient and we can study its efficiency on another day ... But nothing is gained ... by tackling these various aspects simultaneously. It is what I sometimes have called "the separation of concerns", which ... is yet the only available technique for effective ordering of one's thoughts ...
* now, what they're really [talking](https://faultlore.com/blah/c-isnt-a-language/) about when it comes to efficiency is how JS is slower than C and react is slower than JS. react is the slowest because it's the most "abstract". and this isn't actually true.
	* > Is it slower than plain three.js?
		>
		> No ... It outperforms three.js at scale due to React's scheduling abilities.
		[source](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
	* i think the biggest problem here is we conceive of react as a framework, and the way we write code mirrors this conception. we've collectively forgotten what react is, and why we're using it.
	* i think the biggest question is "how can i eliminate unnecessary re-renders? wouldn't it be amazing if someone created a way that only components that depend on a piece of state re-rendered?"
		* they keep taking state further out of react to try to achieve this
		* fortunately, the **react team** considered this and came out with this really cool state management library, called React. let's see it in action.
	* what we see are a couple of concerns jumbled together
		* we're concerned with tracking each letter that enters the input
		* and we have the concern of tracking the state of the TODOs
	* these have nothing to do with one another
	* the heuristic i use is "what do i care about right now? what does the component care about?"
		* if there's state in there you don't care about, take it out
	* Remember, the core conceit of react is `State -> UI`
		* the really, profoundly, gorgeous thing about react is that 
		* when we speak components, we're speaking state ui. the component form implicitly binds that together.
		* because react can rely on that, we don't have to communicate these things explicitly. by seprarating our concerns—by separating our state—by relying on the ways in which these things necessarily mirror one another, we're necessarily making our app faster.
		* and there's a profound beauty in that connection.
