import { namesSearchTableName } from "@/app/hooks/hooks";
import { createSlice } from "@reduxjs/toolkit";

const lsStore =
  typeof window !== "undefined"
    ? JSON.parse(String(localStorage.getItem("filtersLC")) || "") || []
    : [];
const initialState: any =
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

export const filtersStoreSlice = createSlice({
  name: "filtersStoreSlice",
  initialState,
  reducers: {
    addFilterToStore(state, action) {
      const {
        searchTableName,
        containerName,
        filterName,
      }: {
        searchTableName: namesSearchTableName;
        containerName: string;
        filterName: string;
      } = action.payload;

      state[searchTableName] = [
        ...state[searchTableName],
        { containerName, filterName },
      ];

      localStorage.setItem("filtersLC", JSON.stringify({ ...state }));
    },
    removeFilter(state, action) {
      const { searchTableName, containerName, filterName } = action.payload;
      if (state[searchTableName]) {
        state[searchTableName] = state[searchTableName].filter(
          (filter: any) =>
            filter.containerName !== containerName ||
            filter.filterName !== filterName
        );
      }
      localStorage.setItem("filtersLC", JSON.stringify({ ...state }));
    },
    resetFilters(
      state,
      action: {
        payload: {
          searchTableName: { ru: string; slug: namesSearchTableName };
        };
      }
    ) {
      const { searchTableName } = action.payload;
      state[searchTableName.slug] = [];
      const updatedState = { ...state };
      localStorage.setItem("filtersLC", JSON.stringify(updatedState));
    },
  },
});

export const { addFilterToStore, removeFilter, resetFilters } =
  filtersStoreSlice.actions;
export default filtersStoreSlice.reducer;
