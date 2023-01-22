import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./Shape.css";

/**
 * ## this is the shape component
 * currently, this manages its own
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
 * lives in the motion store. a `useEffect` hook is used to 'watch'
 * the store
 *
 * @param props - please supply this shapes data as a prop
 * @returns the shape component
 */
const Shape = (props) => {
  const motion = useSelector((state) => state.motion);
  const shapes = useSelector((state) => state.shapes);

  let [transClass, setTransClass] = useState(false);

  let selectedShapeClass = "";
  switch (props.data.type) {
    case "circles":
      selectedShapeClass = "Circle";
      break;
    case "squares":
      selectedShapeClass = "Square";
      break;
    case "triangles":
      selectedShapeClass = "Triangle";
      break;
    default:
      break;
  }

  // this is the side effect block that updates the position for the shape
  // there is a warning that we have not included all dependencies, but we
  // have. the `motion.update` dependency is a sort of meta-dependency,
  // representing the change in all four motion arrays.
  const thisElement = useRef(null);

  useEffect(() => {
    let el = thisElement.current;
    console.log(el.style);
    // grab the new positions and new targets
    const tX0 = motion.positionsX[props.data.idx],
      tY0 = motion.positionsY[props.data.idx];
    const tX1 = motion.positionsX[props.data.idx] + motion.velocitiesX,
      tY1 = motion.positionsY[props.data.idx] + motion.velocitiesY;
    // apply the new positions and targets
    el.style.left = `${tX0}px`;
    el.style.top = `${tY0}px`;
    el.style.transform = `translateX(${tX1}px) translateY(${tY1}px)`;
    console.log(el.style);
  }, [motion.update, props.data]);

  // this is the side effect block that handles transparency stuff
  // again, we only want to rerender if a `transparency` value changes
  useEffect(() => {
    if (shapes.transparent[props.data.index]) setTransClass(true);
    else setTransClass(false);
  }, [shapes.transparent]);

  return (
    <div
      ref={thisElement}
      className={`Shape ${selectedShapeClass} 
        ${transClass ? "Tranparent" : "Solid"}`}
      // style={{
      //   left: motion.positionsX[props.data.idx] + "px",
      //   top: motion.positionsY[props.data.idx] + "px",
      //   transform:
      //     motion.forward || motion.backward
      //       ? `translateX(${
      //           motion.positionsX[props.data.idx] + motion.velocitiesX
      //         }px) 
      //    translateY(${
      //      motion.positionsY[props.data.idx] + motion.velocitiesY
      //    }px)}`
      //       : "",
      // }}
    >
      I am a {props.data.size}px {props.data.type}, my name is {props.data.name}
    </div>
  );
};

export default Shape;
