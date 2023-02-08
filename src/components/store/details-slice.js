import { createSlice } from "@reduxjs/toolkit";
const DetailsSlice = createSlice({
  name: "details",
  initialState: {
    anime: {}, // store the anime clicked
    showDetails: false, // if the anime clicked or not (boolean)
  },
  reducers: {
    showDetails(state, action) {
      // change anime state
      state.anime = action.payload;
    },

    setShowDetails(state, action) {
      state.showDetails = action.payload;
    },
  },
});
export const detailsActions = DetailsSlice.actions;
export default DetailsSlice;
