import { createSlice } from "@reduxjs/toolkit";
import Shape from "../js/Shape";

export const shapesSlice = createSlice({
  name: "shapes",
  initialState: {
    initiated: false,
    shapes: [],
    transparent: {
      circles: true,
      triangles: true,
      squares: true,
    },
  },
  reducers: {
    /**
     * a transparency switch has changed state, do something about it
     * @param {*} state
     */
    toggleTransparency: (state, action) => {
      state.transparent[action.payload] = !state.transparent[action.payload];
    },
    /**
     * create an array of `Shape` instances that randomly select their own data
     *
     * @param {*} state
     * @param {*} action payload contains number of shapes
     */
    initShapesStructure: (state, action) => {
      const n = action.payload;
      state.shapes = Array.from({ length: n }, (el, idx) => new Shape(idx));

      state.initiated = true;
    },
  },
});

export const { toggleTransparency, initShapesStructure } = shapesSlice.actions;

export default shapesSlice.reducer;
