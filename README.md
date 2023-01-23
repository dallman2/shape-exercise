# shape-exercise
A brief project for me to learn some React use cases beyond "Hello World"

## Discussion on some of the choices I made
---
### Stores/ Redux
#### **Redux organization**
When I first read the parameters of this challenge, one idea for displaying 
these moving shapes was to use a library like `two.js` to manage an HTML `canvas` 
element. From there, the positions and velocities of the shapes could be stored
in `ArrayBuffer` containers, allowing me to scale to huge numbers of shapes (in theory).

As I thought about this approach, it became clear that using a `canvas` would not 
really be in the spirit of the challenge, and could introduce some nasty complexities
further down the line. However, the thought to use `ArrayBuffers` still seemed promising.

My previous work with state management solutions like `Vuex` or `Pinia` showed me that while
these libraries are hugely valuable for managing state, it can incur a performance penalty.
If I could somehow get Redux to manage an `ArrayBuffer` as a whole, I might be able to
bypass that penalty. 

With that sentiment in mind, I structured the stores as such:

```
root/
    shapes
        initiated: bool
        shapes: list
        transparent
            circles: bool
            triangles: bool
            squares: bool
    motion
        initiated: bool
        forward: bool
        backward: bool
        positionsX: list
        positionsY: list
        velocitiesX: list
        velocitiesY: list
        style: list
```
Where `shapes` contains information about the shapes types, their names, 
and what should and should not be transparent. The `motion` slice contains,
as the name suggests, all iformation relating to the motion of the shapes, 
such as the current direction, velocities, positions, and the styles to be 
applied to the actual HTML Elements in order for the user to see the animation.

#### **But why are there separate slices?**
As I started to learn about the nuances of Redux, I came across warnings detailing
the poor performance of stores, and how tangling up state too much could cause many 
unneeded rerenders. My attempt to combat this was the separation of `motion` and 
`shapes`. Originally, the `motion` store was supposed to use `ArrayBuffers`, rather
than using lists. In theory, this could have sped up compute for shape counts above
a few thousand. That way, information in the `shape` store could be accessed and 
modified at will, without risking having to do expensive calculations over again.

When it came time to implement, I learned something else about Redux stores; they can
only really handle `Serializable` objects. Technically, they will work with any object,
but reactivity depends on serializability. With that, both `ArrayBuffer` and class instances
went out the window, as neither are natively serializable. Sure, an adapter could be 
built to serialize and unserialize, but that would have likely taken just as much compute 
time as the native solution; a `list`.

#### **Is it technical debt?**
I do not think so, but I am biased. I think there is a legitimate case fo the separation
of concerns from the 'data' of the shape and the 'view' of the shape. I think that 
it is worth the cost of having to do something like 'zip up' the data from the `shape` and
`motion` stores in the `Controls` component to be able to print all of the data for a `Shape`
in the console.

---
### Animations/ Transitions
#### **Why do one over the other?**
At first, I found some promising functionality using `@keyframes` combined with CSS `animation`.
I hacked together a mechanism for programmatically injecting new values into an element's `style`
using `CSS custom properties`. As I got farther into the implementation, using basic `transition`
and `transform` styles seemed to be able to do what I needed without needing custom props. From a 
technical perspective, it appears that programmatically injecting `@keyframes` into a component is
not supported. While this is not a complete impass, it would make an implementation 
using `@keyframes` much more complex than using `transition` and `transform`.
#### **Why do the `Shape` elements not manage their own `style`?**
Originally, I had a `useEffect` hook in the `Shape` component that watched the `motion` store.
A flag existed to act as a 'clock', and trigger an update on the shape to create a smooth animation.
This approach required both a `useState` and a `useEffect` hook in the `Shape` component. Eventually,
I settled on allowing the `motion` store to maintain the list of `style` objects, and then using
the reactivity system to keep the `style` on the `Shape`. 