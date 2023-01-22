import { createSlice } from "@reduxjs/toolkit";

/** How large is the position window? */
const UPPER_WINDOW_BOUND = 800,
  /** How large is the velocity window? */
  VELOCITY_RANGE_WIDTH = 10,
  /** How far do we want to shift the velocity window? */
  VELOCITY_RANGE_OFFSET = -5;

export const motionSlice = createSlice({
  name: "motion",
  initialState: {
    initiated: false,
    forward: false,
    backward: false,
    update: false,
    positionsX: [],
    positionsY: [],
    velocitiesX: [],
    velocitiesY: [],
  },
  reducers: {
    /**
     * the forward switch has changed state, do something about it
     * @param {*} state
     */
    forwardToggle: (state) => {
      if (state.backward) state.backward = false;
      state.forward = !state.forward;
    },
    /**
     * the backward switch has changed state, do something about it
     * @param {*} state
     */
    backwardToggle: (state) => {
      if (state.forward) state.forward = false;
      state.backward = !state.backward;
    },
    /**
     * create arrays with random values for positions and velocities
     *
     * **all four position and velocity arrays are parallel**
     * @param {*} state
     * @param {*} actions payload contains number of shapes
     */
    initShapesMotion: (state, actions) => {
      // declare functions and `n`
      const n = actions.payload,
        randomPosGen = (el, idx) => Math.random() * UPPER_WINDOW_BOUND,
        randomVelGen = (el, idx) =>
          Math.random() * VELOCITY_RANGE_WIDTH + VELOCITY_RANGE_OFFSET;
      // declare the arrays we need for motion
      state.positionsX = Array.from({ length: n }, randomPosGen);
      state.positionsY = Array.from({ length: n }, randomPosGen);
      state.velocitiesX = Array.from({ length: n }, randomVelGen);
      state.velocitiesY = Array.from({ length: n }, randomVelGen);
      // let the toggles know that they can engage
      state.initiated = true;
    },
    /**
     * updates the positions from some point in time `t(k)` to `t(k +/- 1)`.
     * depending on the direction of motion
     * @param {*} state 
     * @returns 
     */
    updateMotionArrays: (state) => {
      // if neither are selected, dont update anything
      if (!state.forward && !state.backward) return;
      // if we make it here, we know that were either going forward or backward
      // because of that, we only need to check one of the values
      state.positionsX = state.positionsX.map((el, idx) => {
        return el + (state.velocitiesX[idx] * state.forward ? 1 : -1);
      });
      state.positionsY = state.positionsY.map((el, idx) => {
        return el + (state.velocitiesY[idx] * state.forward ? 1 : -1);
      });
      // toggle the update flag to trigger a rerender
      state.update = !state.update;
    }
  },
});

export const { forwardToggle, backwardToggle, initShapesMotion, updateMotionArrays } =
  motionSlice.actions;

export default motionSlice.reducer;
