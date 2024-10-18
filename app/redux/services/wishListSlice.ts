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
      console.log(element, "AAAAAAAAAAAAA");
      localStorage.setItem("wishlistTechpoisk", JSON.stringify(state));
    },
  },
});

export const { addComponentWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
