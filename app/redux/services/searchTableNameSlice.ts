import { namesSearchTableName } from "@/app/hooks/hooks";
import { createSlice, nanoid } from "@reduxjs/toolkit";

export interface IsearchTableName {
  searchTableName: { ru: string; slug: namesSearchTableName };
}

const initialState: IsearchTableName = {
  searchTableName: { ru: "Процессор", slug: "processor" },
};

export const searchTableNameSlice = createSlice({
  name: "searchTableNameSlice",
  initialState,
  reducers: {
    setNewSearchTableName: (state, action) => {
      state.searchTableName = action.payload.searchTableName;
    },
  },
});

export const { setNewSearchTableName } = searchTableNameSlice.actions;
export default searchTableNameSlice.reducer;
