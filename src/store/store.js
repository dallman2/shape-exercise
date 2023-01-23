import { configureStore } from "@reduxjs/toolkit";
import shapes from "./shapes";
import motion from "./motion";
export default configureStore({
  reducer: {
    shapes,
    motion
  },
});
