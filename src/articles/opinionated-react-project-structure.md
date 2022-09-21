---
layout: layout.tmpl.jsx
published: 2022-07-05
title: Opinionated React project structure
ver: 1
monospaced: False
tags:
  - programming
  - react
---

[[tableofcontents]]

## the part where i say the opposite of what i think you should do

so the standard advice is something like as follows:

```
+ src/
|
+-- components/
| |
| +-- MyComponent/
| | |
| | +-- MyComponent.js
| | |
| | +-- MyComponent.presentational-components.js
| | |
| | +-- MyComponent.types.dts
| | |
| | +-- MyComponent.hooks.js
| | |
| | +-- MyComponent.styles.js
| | |
| | +-- MyComponent.tests.js
```

which can be expressed more succinctly as:

```
+ src/
|
+-- components/
| |
| +-- MyComponent/
| | |
| | +-- MyComponent.js.js
| | |
| | +-- MyComponent.html.js
| | |
| | +-- README.md
| | |
| | +-- MyComponent.js.js
| | |
| | +-- MyComponent.css.js
| | |
| | +-- MyComponent.tests.js
```

my thesis^[at the risk of sounding a bit pretentious, the---like, metathesis of this---is "*most thought-provoking in our thought-provoking time is that we are still not thinking*".[1]] is that we, as community, haven't learned what separation of concerns means. we're still merely separating technology.

## Die Welt als Wille und Vorstellung

there's an elevator in Elden ring that goes on forever. you know the one. you open the door to a circle structure and walk onto the little raised circle, in the center of a large, cut out circle. the cut out circle cuts itself out of the structure and descends into the maw of the earth. for maybe a minute all you can see is rock, so you go make yourself a pousse cafe or something.

anyhoo, you get back, and you're standing on that same circle, but now it's somewhere i oughtn't spoil. the important thing is that you're standing on the little pressure plate in the center. you step off it, and step back on it, and the elevator goes back up.

for whatever reason, that triggered something within me and i wondered how i would go about it.  you couldn't model it like this

```
 -+  ┴
─┨├── ───Ⓜ
```

ie

```
const [isDepressed, setIsDepressed] = useState (false)
const [direction, toggle] = useReducer (d => d === 'down' ? 'up' : 'down', 'down')
return <Elevator onComplete={toggle} active={isDepressed}/>
```

the naive implementation has the elevator going back up before you've returned from making your cheeky little cocktail. you need some sort of something that senses the character has moved off the plate and resets the plate. the details of that are best answered by the particularities of the game engine. 

...anyhoo, imagine a bad implementation here

the trick, it seems, is keeping the [regulator](https://en.wikipedia.org/wiki/Good_regulator) as [tight](https://en.wikipedia.org/wiki/Variety_(cybernetics)#Law_of_requisite_variety) as you can to the regulated. //TODO TODO TODO

## then say "[prithee](https://www.youtube.com/watch?v=RB15xclTJSo), don't do that! do this instead!"

to the user a component is a component is a component. when you feed it in as a child to another component, `styled (Component)`width: 100%`` is just a component. when you `memo (styled (Component)({width: '100%'}))`, it's just a component.

but when we look for what to separate in order to attunate the variety of our ¿files?, we neglect our programming model, all the fun little buzzwords we've been spouting at our conferences, and fall back on commonsensical separation of technology.

to me, that's what opinionated means: "relative to this problem^[the "problem" in this case includes all aspects of the solution already defined, encoded into the existing program. the "premature" &/or "forsight-lacking" parts of the solution we call "technical debt"], there is a better solution, and i have an emotional attachment to it".

## Opinionated React project structure

react and structure seem pretty obvious to me, though the question of structuring emerges. opinion is common sensical[^3] or else nonsensical; thereof one must be silent. with regards to projection:

for the sake of this, we'll map the project out by following the product it projects, back into the development process. to simply things, we'll be sticking to the popular corporate model of product development centering around a product manager. we'll assume the project has at least one "deployment", which can be identified by a URL or a app store app. we'll assume this deployment is loosely[^4] bounded by a npm package, which may or may not be a part of a monorepo

### "Practical" issues

#### css

```
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
const useStyles = makeStyles ({
  createStyles ({
    div: {...},
    span: {...},
  })
})

export const Component = props => {
  const classes = useStyles ()
  return (
    <div className={classes.div}>
      <span className={classes.span}>
        whatever lol
      </span>
    </div>
  )
}
```

if you delete `div` or `span`, the editor won't give any indication that likewise need to delete `classes.div` from the `makeStyles`. this is easy enough to remember if the css and html are in the same file (i've only forgotten to delete the css twice), but is all the harder when the css is occulted in another file. i have nothing against personal responsibility, but tying it to the actual object of the ui through `styled ('div')({...})` conjoins the two at the hip.

## Co-location

// TODO heideggerian thinking together (building-dwelling-thinking); mitsein


[^3]: 
    > The thinking of Being ... has since Place been understood as "philosophy" ... In the thinking of Being the liberation of man [(the grounds of history)]... is put into words. These are not merely the "expression" of an opinion but always already the ably conserved articulation of the truth of being as a whole ... However, in the same period in which the beginning of philosophy takes place, the *marked* domination of common sense (sophistry) also begins. [1, p. 135]

    > The question whether human thought achieves objective truth is not a question of theory but a *practical* question... [1, p. 214]

    which to me strikes a particular resonance: the practical is the actual, the mode of Being in which one actually practices actions upon objective objects—if the actual is not simply, actually the objective itself.

[^4]: "by loosely bounded" i mean to say that its "application code" is all written in that package, while code that isn't in some way specific to the application is, to a greater or lesser extent, relegated to packages or the programming language.
