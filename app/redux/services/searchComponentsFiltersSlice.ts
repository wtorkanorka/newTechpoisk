import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface IsearchComponentsFiltersSlice {
  [key: string]: { name: string; type: string };
  searchComponents: { name: string; type: string };
  wishlist: { name: string; type: string };
}

const initialState: IsearchComponentsFiltersSlice = {
  searchComponents: {
    name: "Сначала дешёвые",
    type: "price",
  },
  wishlist: {
    name: "Сначала дешёвые",
    type: "price",
  },
};

export const searchComponentsFiltersSlice = createSlice({
  name: "searchComponentsFiltersSlice",
  initialState,
  reducers: {
    setNewFilter: (
      state,
      action: PayloadAction<{
        componentName: string;
        name: string;
        type: string;
      }>
    ) => {
      state[action.payload.componentName] = {
        name: action.payload.name,
        type: action.payload.type,
      };
    },
  },
});

export const { setNewFilter } = searchComponentsFiltersSlice.actions;
export default searchComponentsFiltersSlice.reducer;
