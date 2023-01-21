import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { forwardToggle, backwardToggle, initShapesMotion } from '../../store/motion';
import { initShapesStructure } from "../../store/shapes";

import "./Controls.css";

import Switch from "react-switch";
import NumericInput from "react-numeric-input";

/**
 * this is a place for all of the controls to be grouped
 * `NumericInput` may have to be refactored into something else,
 * as it uses lifecyle methods rather than `useEffect` hooks...
 * thats a problem for later, or for the `npm` package maintainers
 * @returns the controls component
 */
const Shape = () => {
  const motion = useSelector((state) => state.motion);
  const dispatch = useDispatch();
  let [n, setN] = useState(1);

  const setup = () => {
    dispatch(initShapesStructure(n))
    dispatch(initShapesMotion(n))
  }

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
        <button onClick={setup}>
          Shapes to initialize: {n}
        </button>
      </label>
      <label>
        <span>Forward</span>
        <Switch
          onChange={() => dispatch(forwardToggle())}
          checked={motion.forward}
          disabled={!motion.initiated}
        />
      </label>
      <label>
        <span>Backward</span>
        <Switch
          onChange={() => dispatch(backwardToggle())}
          checked={motion.backward}
          disabled={!motion.initiated}
        />
      </label>
    </>
  );
};

export default Shape;
