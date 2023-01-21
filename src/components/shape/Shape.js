import { useEffect } from "react";
import "./Shape.css";

/**
 * ## oh baby
 * this is the shape component. currently, this manages its own 
 * animation logic. whats actually going on here is a combination of:
 *  - transitions
 *  - intervals
 *
 * #### transitions
 * effectively, we grab the element from the dom and replace
 * its transition style with new values dependant on its new 
 * position. 
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
    let el = document.getElementById("theShape");
    el.style.transform = `translateX(25px) translateY(25px)`
    const interval = setInterval(() => {
      console.log('update')
      el.style.top = '50px'
      el.style.left = '50px'
      el.style.transform = `translateX(-25px) translateY(50px)`
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
