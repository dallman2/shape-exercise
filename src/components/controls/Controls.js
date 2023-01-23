import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  forwardToggle,
  backwardToggle,
  initShapesMotion,
  updateMotionArrays,
} from "../../store/motion";
import { initShapesStructure, toggleTransparency } from "../../store/shapes";

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
  const shapes = useSelector((state) => state.shapes);

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
    if (!motion.forward && !motion.backward && !interval.current) {
      // this is the block if nothing is running
      dispatch(forward ? forwardToggle() : backwardToggle());
      doUpdate();
      interval.current = setInterval(doUpdate, 1000);
    } else if (motion.forward && interval.current) {
      // this is the block if were going forward
      if (forward) {
        // if we clicked the forward button while going forward,
        // just stop the motion
        clearInterval(interval.current);
        interval.current = null;
        dispatch(forwardToggle());
      } else {
        // otherwise, we clicked the backwards button while going
        // forward. so, clear the interval, set a new one, and
        // toggle the button
        clearInterval(interval.current);
        dispatch(backwardToggle());
        doUpdate();
        interval.current = setInterval(doUpdate, 1000);
      }
    } else if (motion.backward && interval.current) {
      // this is the block if were going backward
      if (forward) {
        // if we clicked the forward button while going backward,
        // clear the interval, set a new one, and toggle the button
        clearInterval(interval.current);
        dispatch(forwardToggle());
        doUpdate();
        interval.current = setInterval(doUpdate, 1000);
      } else {
        // otherwise, we clicked the backwards button while going
        // backward. just stop the motion
        clearInterval(interval.current);
        interval.current = null;
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

  /**
   * this 'zips' all data for a single shape into an object,
   * maps all of those objects into a list, then prints the list
   */
  const shapesToConsole = () => {
    const fullList = shapes.shapes.map((el, idx) => {
      const singleMotion = {
        tX: motion.positionsX[idx],
        tY: motion.positionsY[idx],
        dX: motion.velocitiesX[idx],
        dY: motion.velocitiesY[idx],
      };
      return {
        ...el,
        motion: singleMotion,
      };
    });
    // console.table(fullList);
    console.log(fullList);
  };

  return (
    <>
      <p className="Title">Controls:</p>
      <div className="Control-container">
        <label>Initialization:</label>
        <div className="Init-controls">
          <label className="Label">Number of shapes:</label>
          <span className="Control">
            <NumericInput
              value={n}
              step={1}
              min={1}
              max={10000}
              snap
              onChange={(val) => setN(val)}
            />
          </span>
          <button className="Control" onClick={setup}>
            Initialize
          </button>
        </div>
      </div>
      <div className="Control-container">
        <label>Console Control</label>
        <div className="Console-controls">
          <button className="Control" onClick={shapesToConsole}>
            Print shapes to console
          </button>
        </div>
      </div>
      <div className="Control-container">
        <label>Motion Control</label>
        <div className="Motion-controls">
          <label className="Label">Forward</label>
          <span className="Control">
            <ReactSwitch
              data-testid="motionForward"
              onChange={() => toggleMotion(true)}
              checked={motion.forward}
              disabled={!motion.initiated}
            />
          </span>
          <label className="Label">Backward</label>
          <span className="Control">
            <ReactSwitch
              data-testid="motionBackward"
              onChange={() => toggleMotion(false)}
              checked={motion.backward}
              disabled={!motion.initiated}
            />
          </span>
        </div>
      </div>
      <div className="Control-container">
        <label>Transparencies</label>
        <div className="Trans-controls">
          <div className="Trans-toggle">
            <label className="Label">Squares</label>
            <span className="Control">
              <ReactSwitch
                data-testid="transSquares"
                onChange={() => dispatch(toggleTransparency("squares"))}
                checked={shapes.transparent.squares}
              />
            </span>
          </div>
          <div className="Trans-toggle">
            <label className="Label">Circles</label>
            <span className="Control">
              <ReactSwitch
                data-testid="transCircles"
                onChange={() => dispatch(toggleTransparency("circles"))}
                checked={shapes.transparent.circles}
              />
            </span>
          </div>
          <div className="Trans-toggle">
            <label className="Label">Triangles</label>
            <span className="Control">
              <ReactSwitch
                data-testid="transTriangles"
                onChange={() => dispatch(toggleTransparency("triangles"))}
                checked={shapes.transparent.triangles}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
