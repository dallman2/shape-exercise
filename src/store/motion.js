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
      const n = actions.payload,
        randomPosGen = (el, idx) => Math.random() * UPPER_WINDOW_BOUND,
        randomVelGen = (el, idx) =>
          Math.random() * VELOCITY_RANGE_WIDTH + VELOCITY_RANGE_OFFSET;

      state.positionsX = Array.from({ length: n }, randomPosGen);
      state.positionsY = Array.from({ length: n }, randomPosGen);
      state.velocitiesX = Array.from({ length: n }, randomVelGen);
      state.velocitiesY = Array.from({ length: n }, randomVelGen);

      state.initiated = true;
    },
  },
});

export const { forwardToggle, backwardToggle, initShapesMotion } =
  motionSlice.actions;

export default motionSlice.reducer;
