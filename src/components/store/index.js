import { configureStore } from "@reduxjs/toolkit";
import DetailsSlice from "./details-slice";

const store = configureStore({
  reducer: {
    details: DetailsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
