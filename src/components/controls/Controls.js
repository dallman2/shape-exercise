import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  forwardToggle,
  backwardToggle,
  initShapesMotion,
  updateMotionArrays,
} from "../../store/motion";
import { initShapesStructure } from "../../store/shapes";

import "./Controls.css";

import ReactSwitch from "react-switch";
import NumericInput from "react-numeric-input";

/**
 * this is a place for all of the controls to be grouped.
 * this component controls the timing interval for dispatching
 * updates to the motion store
 * @returns the controls component
 */
const Controls = () => {
  const motion = useSelector((state) => state.motion);

  const dispatch = useDispatch();
  /** this is the value and setter for the number of shapes */
  let [n, setN] = useState(1);
  /** this is the ref for our timer/ interval */
  let interval = useRef(null);
  /** wrapper for dispatching updates */
  let doUpdate = () => {
    dispatch(updateMotionArrays());
  };

  /**
   * this is the master motion toggle. it is a bit of a mess, but the
   * control flow for this exercise isnt exactly trivial. really, the
   * need to manage intervals bring in most of the complexity. The flow
   * for this function is very easy to understand though.
   *
   * ### flow
   * - **if no buttons are currently selected**:
   *    - dispatch the proper toggle
   *    - set the interval to dispatch the update
   *
   * - **if one of the buttons is currently selected and we click it**:
   *    - clear the current interval
   *    - dispatch the proper toggle
   *
   * - **if one of the buttons is currently selected and we click the other one**:
   *    - clear the current interval
   *    - dispatch the proper toggle
   *    - set a new interval to dispatch the update
   * @param {boolean} forward - did we click the forward button?
   */
  let toggleMotion = (forward) => {
    console.log("clicked a button");
    console.log(motion);
    console.log(interval);
    if (!motion.forward && !motion.backward && !interval.current) {
      console.log("nothing running, starting");
      // this is the block if nothing is running
      dispatch(forward ? forwardToggle() : backwardToggle());
      interval.current = setInterval(doUpdate, 1000);
    } else if (motion.forward && interval.current) {
      console.log("forward on, interval found");
      // this is the block if were going forward
      if (forward) {
        // if we clicked the forward button while going forward,
        // just stop the motion
        clearInterval(interval.current);
        interval.current = null
        dispatch(forwardToggle());
      } else {
        // otherwise, we clicked the backwards button while going
        // forward. so, clear the interval, set a new one, and
        // toggle the button
        clearInterval(interval.current);
        dispatch(backwardToggle());
        interval.current = setInterval(doUpdate, 1000);
      }
    } else if (motion.backward && interval.current) {
      console.log("backward on, interval found");
      // this is the block if were going backward
      if (forward) {
        // if we clicked the forward button while going backward,
        // clear the interval, set a new one, and toggle the button
        clearInterval(interval.current);
        dispatch(forwardToggle());
        interval.current = setInterval(doUpdate, 1000);
      } else {
        // otherwise, we clicked the backwards button while going
        // backward. just stop the motion
        clearInterval(interval.current);
        interval.current = null
        dispatch(backwardToggle());
      }
    }
  };

  /**
   * this method is a wrapper for dispatching the init calls to both the
   * shapes and motion stores
   */
  const setup = () => {
    dispatch(initShapesStructure(n));
    dispatch(initShapesMotion(n));
  };

  return (
    <>
      <p>I hold the controls</p>
      <label>
        <span>Number of shapes:</span>
        <NumericInput
          value={n}
          step={1}
          min={1}
          max={10000}
          snap
          onChange={(val) => setN(val)}
        />
        <button onClick={setup}>Shapes to initialize: {n}</button>
      </label>
      <label>
        <span>Forward</span>
        <ReactSwitch
          onChange={() => toggleMotion(true)}
          checked={motion.forward}
          disabled={!motion.initiated}
        />
      </label>
      <label>
        <span>Backward</span>
        <ReactSwitch
          onChange={() => toggleMotion(false)}
          checked={motion.backward}
          disabled={!motion.initiated}
        />
      </label>
    </>
  );
};

export default Controls;
