import { createSlice, nanoid } from "@reduxjs/toolkit";

interface wishList {
  id: number;
  name: string;
  isAssembly: boolean;
  component: any;
}

const initialState: wishList[] =
  typeof window !== "undefined"
    ? JSON.parse(String(localStorage.getItem("wishList"))) || []
    : [];

export const wishListSlice = createSlice({
  name: "wishListSlice",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const data = {
        id: action.payload.id,
        name: action.payload.name,
        isAssembly: action.payload.isAssembly,
        component: action.payload.component,
      };
      state.push(data);
      localStorage.setItem("wishList", JSON.stringify(state));
    },
    removeFromWishList: (state, action) => {
      const filteredData = state.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("wishList", JSON.stringify(filteredData));

      return filteredData;
    },
    editName: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index].name = action.payload.name;
        localStorage.setItem("wishList", JSON.stringify(state));
      }

      return state;
    },
  },
});

export const { addToWishList, removeFromWishList, editName } =
  wishListSlice.actions;
export default wishListSlice.reducer;
