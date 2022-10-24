---
layout: layout.tmpl.jsx
published: 2022-09-21
title: separating separation of concerns
ver: 1
monospaced: False
type: talk
id: react-advanced-2022
tags:
  - programming
  - react
  - web development
slides_id: react-advanced-2022
---

[[tableofcontents]]

## introduction

i understand i cover a lot of ground in this talk. i point to a lot of trails we don't go down. 

firstly, i don't think that [signals](https://preactjs.com/blog/introducing-signals) or redux are bad libraries/data management methods. i had 7 minutes and i needed a hook. sometimes it's worth it to be funny, even if you're going a little bit further out than you'd otherwise like to. a corollary of my emphasis on the implicit at the end there is that a big part of react is that *you don't need to "get it"*. react works well because of the nature of the tree structure. i profer to get it, but i'm certainly not the best programmer on my dev team.
i will say that signals is a firm movement away from what react *[is](#the-question-of-being)*. but signals isn't in react! it's in preact! i'm barking up [the wrong tree](#a-note-on-the-atmosphere) lol!

and yes, saying that "react performs better than vanilla js *in general*" by treating three.js applications as a representative sample is somewhere between damn lies and statistics. the gripping hand in the question of performance is that [Mel](https://en.wikipedia.org/wiki/The_Story_of_Mel) isn't a representative sample of programmers, nor a representative sample of the task/concerns of programming.

and yes, this talk was not about philosophy of technology, more like, philosophy and technology. probably not even that. i put the topic in as "philosophy of technology?" thinking they'd put it in a different category lol. that being said, i hear you can pass this off as philosophy of technology in a number of American philosophy departments, so, what do i know.

secondly, <a href="/collections/slides/react-advanced-2022/0/">the slides are here</a>. the outline of the talk is reprinted below. i may or may not have changed or jammed through some parts of the talk and settled on something slightly different, but this is what i had on my screen while i spoke.

lastly, i'd like to offer some further directions for the interested listener. those are below the outline. quotes are linked to their sources in the outline. i hope to fully expand upon everything i've touched upon here. until then, follow the links below.

## outline

* intro
* my concern is what i'm attempting to do
* how i accomplish that [mirrors](#recapitulation) my understanding of my concern
  * let's say i'm trying to make a grand TODO app.
    * i choose to understand the concern as a whole as the management of a list of non-interconnected tasks 
    * your understanding is a list so you use a list
    <!-- * `todos.map (p => <Todo key={p.id} {...p}/>)` -->
  * moving a step up, we can see this functionality is embedded in a page with other functionality
    * if i understand my concern as a number of nested sub-concerns, i'll use some sort of tree structure, such as the DOM
* [#the-question-of-being](nothing is ever only itself)
* but in practice, the job of the programmer isn't just programming. all kinds of other concerns are jostling for attention.
  * how can i ensure the system retains a certain level of performance and functionality?
  * these were the core concerns of Dijkstra when he was writing his seminal paper, *[on the role of scientific thought](https://www.cs.utexas.edu/users/EWD/transcriptions/EWD04xx/EWD447.html)*
  * > a program must be correct and we can study it from that viewpoint only; we also know that it should be efficient and we can study its efficiency on another day ... But nothing is gained ... by tackling these various aspects simultaneously. It is what I sometimes have called "the separation of concerns", which ... is yet the only available technique for effective ordering of one's thoughts ...
* now, what they're really [talking](https://faultlore.com/blah/c-isnt-a-language/) about when it comes to efficiency is how JS is slower than C and react is slower than JS. react is the slowest because it's the most "abstract". and this isn't actually true.
  * > Is it slower than plain three.js?
    >
    > No ... It outperforms three.js at scale due to React's scheduling abilities.
    <br/>[source](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
  * i think the biggest problem here is we conceive of react as a framework, and the way we write code mirrors this conception. we've <a href="#collective-forgetting">collectively forgotten</a> what react is, and why we're using it.
  * i think the biggest question is "how can i eliminate unnecessary re-renders? wouldn't it be amazing if someone created a way that only components that depend on a piece of state re-rendered?"
    * they keep taking state further out of react to try to achieve this
    * fortunately, the React Team considered this and came out with this really cool state management library, called React. let's see it in action.
  * what we see are a couple of concerns jumbled together
    * we're concerned with tracking each letter that enters the input
    * and we have the concern of tracking the state of the TODOs
  * these have nothing to do with one another
  * the heuristic i use is "what do i care about^[ie, what am i concerned with?] right now? what does the component care about?"
    * if there's state in there you don't care about, take it out
  * Remember, the core conceit of react is `State -> UI`
    * the really, profoundly, gorgeous thing about react is that 
    * when we speak components, we're speaking state ui. the component form implicitly binds that together.
    * because react can rely on that, we don't have to communicate these things explicitly. by seprarating our concerns—by separating our state—by relying on the ways in which these things necessarily mirror one another, we're necessarily making our app faster.
    * and there's a profound beauty in that connection.

## a note on the atmosphere

i don't spend a lot of time on twitter. i do spend a lot of time reading blog posts from newsletters[^shift], and i'm getting a feeling. the [ideology](https://www.youtube.com/watch?v=uuTkuy9D5lY) is shifting. react was getting a lot of hate when i first started drafting my outline. i've experienced a bit less hate recently, just a muted resentment. "was i one of the hosts that helped [presence](https://www.orphandriftarchive.com/articles/hyperstition/) this egregore?" almost definitely.

does that have anything to do with what industry is doing? the life and death of San Francisco; the retreat of venture capital, the death of crypto, and the slowing of the start-up sphere; the hiring freeze, the apophantical rumblings about soft quitting and soft firing? perhaps. i'm no sociologist.

[fresh](https://fresh.deno.dev/docs/getting-started/form-submissions), [remix](https://remix.run/blog/not-another-framework), perhaps even [ultra](https://ultrajs.dev/), all feel to me like a new world struggling to be born. all of them use react. maybe this is a sort of cynicism, a feeling that react will always rule the frontend space. [all the big guys](https://microsoft.github.io/react-native-windows/blog/2022/02/11/settings?ck_subscriber_id=1450305946) are using it, and there are going to be fewer, smaller small guys. or maybe react is just awesome. who knows.

[^shift]: mostly [this one](https://toot.cafe/@baldur), [es next](http://esnextnews.com/), and [the ui.dev](https://bytes.dev) ones

## further readings

### a note on the implicit

react components don't re-render when their props change.

let's consider what would cause a prop to change. props are necessarily passed in from some parent. there are two cases in which that datum would change:

- if that datum is calculated during the caller's render phase—ie, in the function that is that component—then that means the parent re-rendered, and the called function will already be queued for re-render.
- if that datum isn't coming from the function that is the calling component, you're going to need some way to sync up react with that external whatever.
  - in the case of something truly external, that's what useEffect is for
  - on the other hand, we have the question of `useRef`. if you're `useRef`fing a DOM node and you're trying to sync up with that, [odds are there's some sort of event you can listen to directly](https://beta.reactjs.org/learn/you-might-not-need-an-effect).

i'd like to draw attention to the words `caller` and `called`. i'd like to harken back to programming more generally. consider:

```jsx
const Caller = ({children}) => <Called>{children}</Called>
const Parent = ({children}) => <Caller><MyEpicChild/></Caller>
```

the relationship between `Caller` and `Called` is very different from the relationship between `Caller` and `MyEpicChild`, yet we call both of them a parent-child relationship. the following is left as an excersize to the reader:

```sh
extract.py -d '~/Library/Application Support/Firefox/Profiles/jok30xud.dev-edition-default/sessionstore-backups/recovery.jsonlz4' \
  | jq '.windows[0].tabs | .[] | .entries | .[] | .url' \
  | sort \
  | uniq
```

```jsx
const Pipeline = _ => (
  <Extract d path='~/Library/Application Support/Firefox/Profiles/jok30xud.dev-edition-default/sessionstore-backups/recovery.jsonlz4'>
    <Jq q='.windows[0].tabs | .[] | .entries | .[] | .url'>
      <Sort>
        <Uniq>
        </Uniq>
      </Sort>
    </Jq>
  </Extract>
)
```

### collective forgetting

#### hauntologie, ideology, implicitcies

### the question of being

### recapitulation

eagle eared listeners may recognize something like [Conway's Law](https://martinfowler.com/bliki/ConwaysLaw.html) in this statement. that's because i'm referring to the [good regulator theorem](https://en.wikipedia.org/wiki/Good_regulator), of which Conway's Law is a corollary.

to get the good regulator theorem, i'd do a bit of mental refactoring. once you understand variety and interface, the good regulator theorem is trivial.

for variety, i cannot undersell the work of [Stafford Beer](https://metaphorum.org/art). his *[Designing Freedom](https://archive.org/details/DesigningFreedom_CBC_Lectures)* and *[Falcondale Collection](https://opendata.ljmu.ac.uk/id/eprint/6/)* are light and cheery, easy to understand, and deeply, subtly profound. [this webinar](https://www.youtube.com/watch?v=q5GqCNavnQw) by Pam Sydelko is one of the most clear and productive applications of the methods.

on the question of interface, i enjoyed [Heidegger](https://publishing.cdlib.org/ucpressebooks/view?docId=ft6q2nb3wh&chunk.id=d0e6507&toc.depth=1&toc.id=d0e6502&brand=eschol)'s *The Question Concerning Technology*, though i'm sure there are programming books that cover the subject better.
