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

export const additionParamsForFiltersSlice = createSlice({
  name: "additionParamsForFiltersSlice",
  initialState,
  reducers: {
    toggleSelectedFilter: (state, action) => {
      state[action.payload.filterName] = !state[action.payload.filterName];
      return;
    },
  },
});

export const { toggleSelectedFilter } = additionParamsForFiltersSlice.actions;
export default additionParamsForFiltersSlice.reducer;
