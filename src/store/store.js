import { configureStore } from '@reduxjs/toolkit'
import control from "./control"
import shapes from "./shapes"
import motion from "./motion"
export default configureStore({
  reducer: {
    control,
    shapes,
    motion
  }
})