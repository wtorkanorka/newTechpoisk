import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState: {
  [key: string]: boolean;
} = {
  cooler: true,
  liquid_cooling: true,
  case_fans: true,
  hdd: true,
  ssd: true,
};

export const additionalParamsForFiltersSlice = createSlice({
  name: "additionalParamsForFiltersSlice",
  initialState,
  reducers: {
    toggleSelectedFilter: (state, action) => {
      state[action.payload.filterName] = !state[action.payload.filterName];
      return;
    },
  },
});

export const { toggleSelectedFilter } = additionalParamsForFiltersSlice.actions;
export default additionalParamsForFiltersSlice.reducer;
