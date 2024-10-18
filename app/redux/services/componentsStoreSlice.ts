import { namesSearchTableName } from "@/app/hooks/hooks";
import { IComponentsResults, IComponentsResultsInStore } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

const lsStore =
  typeof window !== "undefined"
    ? JSON.parse(String(localStorage.getItem("componentsStoreLC")) || "") || []
    : [];
const initialState =
  lsStore.length === 0
    ? {
        motherboard: [],
        processor: [],
        ram: [],
        ["hdd,ssd"]: [],
        gpu: [],
        power_supply: [],
        case: [],
        ["cooler,liquid_cooling,case_fans"]: [],
      }
    : lsStore;

export const componentsStoreSlice = createSlice({
  name: "componentsStoreSlice",
  initialState,
  reducers: {
    addComponentToStore(
      state,
      action: {
        payload: {
          searchTableName: { ru: string; slug: namesSearchTableName };
          component: IComponentsResultsInStore;
        };
      }
    ) {
      if (
        action.payload.searchTableName.slug === "motherboard" ||
        action.payload.searchTableName.slug === "processor" ||
        action.payload.searchTableName.slug === "case" ||
        action.payload.searchTableName.slug === "power_supply"
      ) {
        state[action.payload.searchTableName.slug] = [action.payload.component];
      } else {
        state[action.payload.searchTableName.slug] = [
          ...state[action.payload.searchTableName.slug],
          action.payload.component,
        ];
      }

      localStorage.setItem("componentsStoreLC", JSON.stringify({ ...state }));
    },
    changeCountOfComponents(
      state,
      action: {
        payload: {
          offerId: number;
          searchTableName: { ru: string; slug: namesSearchTableName };
          count: number;
        };
      }
    ) {
      const arr = state[action.payload.searchTableName.slug];
      const index = arr.findIndex(
        (elem: IComponentsResultsInStore) =>
          elem.selectedOffer.id === action.payload.offerId
      );
      if (index !== -1) {
        arr[index].countOfComponents = action.payload.count;
      }
      localStorage.setItem("componentsStoreLC", JSON.stringify({ ...state }));
    },
    removeComponentFromStore(
      state,
      action: {
        payload: {
          searchTableName: { ru: string; slug: namesSearchTableName };
          component: IComponentsResultsInStore;
        };
      }
    ) {
      state[action.payload.searchTableName.slug] = state[
        action.payload.searchTableName.slug
      ].filter((elem: IComponentsResultsInStore) => {
        return (
          elem.selectedOffer.id !== action.payload.component.selectedOffer.id
        );
      });

      localStorage.setItem("componentsStoreLC", JSON.stringify({ ...state }));
    },
  },
});

export const {
  addComponentToStore,
  removeComponentFromStore,
  changeCountOfComponents,
} = componentsStoreSlice.actions;
export default componentsStoreSlice.reducer;
