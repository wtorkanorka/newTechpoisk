import { IComponentsResults, IComponentsResultsInStore } from "@/app/types";

import { createSlice, nanoid } from "@reduxjs/toolkit";

export interface IWishList {
  component: IComponentsResults;
  price: number;
  name: string;
  id: number | string;
  isAssembly: boolean;
}
const lsStore =
  typeof window !== "undefined"
    ? JSON.parse(String(localStorage.getItem("wishlistTechpoisk")) || "") || []
    : [];
const initialState: IWishList[] = lsStore.length === 0 ? [] : lsStore;

export const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    addComponentWishlist: (
      state,
      action: {
        payload: {
          component: IComponentsResults;
          price: number;
          name: string;
          id: number | string;
          isAssembly: boolean;
        };
      }
    ) => {
      const element = {
        component: action.payload.component,
        price: action.payload.price,
        name: action.payload.name,
        id: action.payload.id,
        isAssembly: action.payload.isAssembly,
      };
      state.push(element);
      localStorage.setItem("wishlistTechpoisk", JSON.stringify(state));
    },
    addAssemblyWishlist: (
      state,
      action: {
        payload: {
          component: any;
          price: number;
          name: string;
          id: number | string;
          isAssembly: true;
        };
      }
    ) => {
      const element = {
        component: action.payload.component,
        price: action.payload.price,
        name: action.payload.name,
        id: action.payload.id,
        isAssembly: action.payload.isAssembly,
      };
      state.push(element);
      localStorage.setItem("wishlistTechpoisk", JSON.stringify(state));
    },
    deleteComponentFromWishlist: (state, { payload: { id } }) => {
      const newState = state.filter(
        (wishListElement) => wishListElement.id !== id
      );
      localStorage.setItem("wishlistTechpoisk", JSON.stringify(newState));
      return newState;
    },
    editNameOfAssemblyWishlist: (
      state,
      action: { payload: { id: string | number; name: string } }
    ) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index].name = action.payload.name;
        localStorage.setItem("wishlistTechpoisk", JSON.stringify(state));
      }

      return state;
    },
  },
});

export const {
  addComponentWishlist,
  deleteComponentFromWishlist,
  addAssemblyWishlist,
  editNameOfAssemblyWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
