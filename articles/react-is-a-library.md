---
layout: layout.11ty.js
published: 2022-07-14
updated: 2022-07-16
title: react is still a library lol
ver: 1
tags:
  - post
  - react
  - programming
---

[[tableofcontents]]

## a heuristic that's—hopefully—common enough that i don't have to give a source

the adage i most often hear is "you call a library; a framework calls you (your code)" (which more of a heuristic than a definition). let's roll with that.

## the application of that heuristic

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

here i'm calling `createRoot.render`; implicitly calling `createElement` on `App` through <span class="sm">jsx</span>; and any other components that are pulled into the system are pulled in by being explicitly called by `App`. i'd say that i'm calling everything called here.

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

i do intuit the "spooky action at a distance" part of `useEffect`: you're passing this function off to `useEffect`, to be called at react's leisure. but you know exactly when it'll be called: when the component is re-rendered, and when the items in the array change[^1]—by this understanding it's about as spooky as `Array.map`.

but that misses the *volitional* distance in "spooky action at a distance". `Array.map (f)` calls `f` as soon as `Array.map (f)` is called. the function is called where it's called. simple as. so too with `_.debounce (f, 300) ()`. should you pass `f` to `useEffect`, you've defined when and why `f` will be called, but you don't—so to speak—call it. everything else in our programming framework has it's call site determined by the call's placement in a text file—but here, we pull it out of that flow and into react's flow.

but isn't that the point of react? to put our code in the flow of user input and the resulting state updates? to keep our apps reactive?

doesn't that argument attack everything about programming, our capacity to call any piece of code (so marked by being in a function) from anywhere else, at any time? is there any strong difference between this and any other function call^["We are now supposed to use the word "to call" in a signification that one might paraphrase approximately with the verbs summon, demand, instruct, direct. We call on someone who is in our way to give way, to make room. But the "call" does not necessarily imply demand, still less command; it rather implies an anticipatory reaching out for something that is reached by our call, through our calling ... the meaning of "call" in the sense of instruct, demand, allow to reach, get on the way, convey, provide with a way, does not immediately occur to us"[1, p.387]]?

one could make a case for the spookiness of "when a component is re-rendered", especially considering how few people understand what triggers a re-render^[it's just when that component's state changes, or when any of it's forefathers' states' change. everything propagates through the system quite deterministically]. the code that is called is all yours, it's just the question of who calls it, and when.

on the one hand, i get where "react is a framework" types are coming from: the unfamiliarity with separating the concerns of "what", "when" and "who". on the gripping hand, that means the only framework in question is *functional programming*.

## ok, well, if react isn't a framework then what is?

an app made with `nextjs` doesn't have that clear, user written `import` structure we saw in `index.js` above. you export functions from a file, & `nextjs` interprets it via that code's location in the file-system. in `nextjs` russia code calls you!!!!!!!

but there's something a bit more substantial to it. `deno` shows that a codebase doesn't have to be structured via a file-system; it can just as easily be structured over the network. though the file-system is of the utmost importance to the programmer, or the implementer of the engine for the language, it doesn't really make a difference to js.

`nextjs`, by pulling *that which structures the code* into its model, sits at a level above the code in the way that `react` doesn't. it finds your code based on where it is, and calls it for you. you must fit yourself it into its structure.

thought in this way, the contrast framework-library recapitulates the contrast machine-tool outlined in [Chapter Fifteen, Section Four](https://www.marxists.org/archive/marx/works/1867-c1/ch15.htm#S4) of Marx's Das Kapital ^[perhaps the first work to put forwards a sophisticated, social philosophy of technology (as opposed to the existential philosophy of technology put forward by say, [Heidegger](https://en.wikipedia.org/wiki/The_Question_Concerning_Technology))].

## movement towards a definition; perhaps an understanding of sorts

with regards to the ontics of what is defined, the following resonates:

> All fully developed machinery consists of three essentially different parts, the motor mechanism, the transmitting mechanism, and finally the tool or working machine ... On a closer examination of the working machine proper, we find in it, as a general rule, though often, no doubt, under very altered forms, the apparatus and tools used by the handicraftsman ... The machine proper is therefore a mechanism that, after being set in motion, performs with its tools the same operations that were formerly done by the workman with similar tools

for this metaphor, we'll call our "application code" the "working machine". this application code is slotted into `nextjs`—as it may be slotted into `remixjs` or any other framework—and the transmitting mechanism connects up all the parts and lines them up to interface with the incoming data, so too sorted^["Here it would be appropriate to discuss Hegel's definition of the machine as an autonomous tool ... the machine is completely nonautonomous, for it has its standing only on the basis of the ordering of the orderable." [1, p.323]] by the factory/framework structure that contains the machinery.

> To work at a machine, the workman ... [must] learn to adapt his own movements to the uniform and unceasing motion of an automaton ... In handicrafts and manufacture, the workman makes use of a tool, in the factory, the machine makes use of him. **There the movements of the instrument of labour proceed from him, here it is the movements of the machine that he must follow**.

this alienation from certain rhythms and certains parts of the means of production isn't always bad. most of us like using frameworks. when you use `nextjs` you have to "adapt your movements to the uniform ... motion of an automaton", but, that's less "sacrifice your [human rhythms](https://dangerousminds.net/comments/give_the_drummer_some_drummers_appreciate_devos_man_machine_alan_meyers) at the altar of the clock" and more "i can rely on this thing; i can do something else". (This liberating form of alienation is foundation of [xenofeminism](https://laboriacuboniks.net/manifesto/xenofeminism-a-politics-for-alienation/#slide11).) i'm at a point in my time with `nextjs` when i'm not super into file-system based routing anymore, but, you know, adapt your movements to attenuate your variety, i guess.

> Along with the tool, the skill of the workman in handling it passes over to the machine.

to be completely honest, i'm not dazzled by Marx's understanding of high technology, but it is thought-provoking in this context.

## appendix A: future directions

these questions of "different kinds of code", "the dividing line between the file-system and the file", "the various layers of structuring" points at—provokes the thought of—a much larger question as to what code is, &amp;c., and i do fully intend to get to that. until then, check out, uh, [this article about react ""project" "structure""](/articles/opinionated-react-project-structure)

* * *

dude i never should have read Heidegger i can't *not* write like a saucy pedantic wretch anymore

## appendix B: Heidegger spends the entire essay "What is called thinking" talking about "call" and never getting to "thinking"

exploring the word "code" might be a bit "thought-provoking"[1, p.371] when placed next to the questions posed above: the difference in the understanding of functions between functional and [structured](https://en.wikipedia.org/wiki/Structured_programming) programmers. if that doesn't interest you, click away or something, i dunno. go play dark souls.

I must note that Heidegger wrote in German. The following are excerpts from a translation of his essay "What is called thinking/What calls for thinking?", "Was Heisst Denken?".

> We are now supposed to use the word "to call" in a signification that one might paraphrase approximately with the verbs summon, demand, instruct, direct. We call on someone who is in our way to give way, to make room. But the "call" does not necessarily imply demand, still less command; it rather implies an anticipatory reaching out for something that is reached by our call, through our calling.

> In the widest sense, "to call" means to set in motion, to get something under way—which may be done in a gentle and therefore unobtrusive manner, and in fact is most readily done that way. In the New Testament, Matthew 8:18, we read, *Videns autem Jesus turbas multas circum se, iussit ire trans fretum*. ["But seeing a large crowd about him, Jesus 'commanded' them to go across the sea."] Luther translates, *Und da Jesus viel Volks um sich sah, hiess er hinuber jenseit des Meeres fahren*. ["And when Jesus saw many people around him he called them to go over across the sea"] To call [heissen] here corresponds to the Latin *iubere* of the Vulgate, which properly means to wish that something might happen. Jesus "called" them to go over: he did not give a command or issue an order. What heissen in this passage means comes to light more clearly if we keep to the older Greek version of the Gospel. Here we read, *Ἰδὼν δὲ ὁ Ἰησοῦς ὄχλον περὶ αὐτὸν ἐκέλευσεν ἀπελθεῖν εἰς τὸ πέραν* ["Seeing a large crowd around him, Jesus called to them to go to the other side"]. The Greek verb keleuein [(as in ἐκέλευσεν)] properly means to get something on the road, to get it under way. The Greek noun keleuthos means way. And that the old word "to call" means not so much a command as a letting-reach, that therefore the "call" has an assonance of helpfulness and complaisance, is shown by the fact that the same word in Sanskrit means something like "to invite."

> the meaning of "call" in the sense of instruct, demand, allow to reach, get on the way, convey, provide with a way, does not immediately occur to us ... "To call" simply means to bestow this or that name ... "to call" means "to command," provided we hear this word too in its native, telling sense. For "to command" basically means, not to give commands and orders, but to commend, entrust, give into safekeeping, to shelter. To call is to appeal commendingly, to direct and so let something be reached. To promise [Verheissung] means to respond to an entreaty in such a way that what is spoken here is spoken *to* and spoken *for*. To call means to appeal, and so to let something arrive and come to presence. It means to speak to something by addressing it.

> When we ask in this way we do, of course, use the word "to call" in a rather unfamiliar signification. But it is unhabitual ... because we are no longer at home with this telling word, because we no longer really live in it ... The place of language properly inhabited, and of its habitual words, is usurped by common terms. The common speech becomes the current speech ... Anything that departs from this commonness ... is at once considered a violation of the standard. It is branded as a frivolous whim.
[1, pp. 288-390]

> Poetic turns of phrase that would be completely unremarkable in French or German become something else when translated into English: either an obnoxious floweriness, or else cliché. People who try to write elegantly in English end up sounding like twats, because this is an argot born in the ashes of monasteries and composed of burning books. It’s for raiding and trading, establishing quantities of one thing and their equivalent in another. [[source](https://samkriss.com/2021/07/12/30000-years-of-hurt/)]

> To see this, only the right concept of language is needed. In the current view, language is held to be a kind of communication. It serves for verbal exchange and agreement, and in general for communicating. But language is not only and not primarily an audible and written expression of what is to be communicated. It not only puts forth in words and statements what is overtly or covertly intended to be communicated; language alone brings beings as beings into the open for the first time. Where there is no language, as in the Being of stone, plant, and animal, there is also no openness of beings, and consequently no openness of nonbeing and of the empty.
[1, p. 198]

I think it'd be really funny if, instead of calling ourselves "coders", we all went around and called ourselves "encoders", "code-breakers", "code-talkers", stuff like that.

## bibliography

[1] M. Heidegger and D. F. Krell, Basic writings: from Being and time (1927) to The task of thinking (1964), Rev. and Expanded ed. San Francisco, Calif.: HarperSanFrancisco, 1993.

[^1]: 99% of the "issues" with the `useEffect` model come from either
    * not understanding how equality works in js
    * not specifying everything the function depends upon
