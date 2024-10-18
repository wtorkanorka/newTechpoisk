import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState: {
  [key: string]: boolean;
} = {
  cooler: false,
  liquid_cooling: false,
  case_fans: true, //Только для чтения
  hdd: false,
  ssd: false,
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
