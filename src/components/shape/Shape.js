import { useEffect } from "react";
import "./Shape.css";

/**
 * ## oh baby
 * this is the shape component. currently, this
 * manages its own animation logic. whats actually going
 * on here is a combination of:
 *  - custom props
 *  - keyframe animation
 *  - intervals
 *
 * #### Custom Props
 * Four custom props are used here:
 * - tX0: the starting `x` offset
 * - tX1: the ending `x` offset
 * - tY0: the starting `y` offset
 * - tY1: the ending `y` offset
 *
 * #### Keyframe animation
 * css keyframe animation is used to tell the browser how
 * to go from the original location to the destination.
 * I have chosen to position all elements at `(0, 0)` relative
 * to the container, and use the custom props to indicate where
 * the browser to render them. Another approach would be to only
 * use a destination custom prop, and update the actual offset
 * instead.
 *
 * #### intervals
 * to actually accomplish something every second, we need to
 * call some sort of function on a regular interval. the
 * `setInterval` function is great for that. currently, the logic
 * lives in the shape component, but i have a feeling that the actual
 * interval logic is going to be extracted to the `store` level of the
 * app. it will be replaced by a `useEffect` hook with a dependency on
 * the `state` of the `store`
 *
 * @returns the shape component
 */
const Shape = () => {
  let moving = true;

  useEffect(() => {
    const interval = setInterval(() => {
      let el = document.getElementById("theShape");
      let sty = window.getComputedStyle(el);
      let x0 = sty.getPropertyValue("--tX0"),
        x1 = sty.getPropertyValue("--tX1"),
        y0 = sty.getPropertyValue("--tY0"),
        y1 = sty.getPropertyValue("--tY1");
      x0 = Number(x0.slice(0, x0.indexOf("px")));
      x1 = Number(x1.slice(0, x1.indexOf("px")));
      y0 = Number(y0.slice(0, y0.indexOf("px")));
      y1 = Number(y1.slice(0, y1.indexOf("px")));
      requestAnimationFrame(() => {
        el.style.setProperty("--tX0", x0 + 50 + "px");
        el.style.setProperty("--tX1", x1 + 50 + "px");
        el.style.setProperty("--tY0", y0 + 10 + "px");
        el.style.setProperty("--tY1", y1 + 10 + "px");
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="theShape" className="Shape">
      I am a shape, here I go {moving ? "moving" : "not moving"}
    </div>
  );
};

export default Shape;
