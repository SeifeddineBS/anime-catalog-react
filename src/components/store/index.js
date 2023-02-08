import { configureStore } from "@reduxjs/toolkit";
import DetailsSlice from "./details-slice";

const store = configureStore({
  reducer: {
    details: DetailsSlice.reducer,
  },
});
export default store;
