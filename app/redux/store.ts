import { configureStore } from "@reduxjs/toolkit";

import wishListReducer from "./services/wishListSlice";
import searchTableNameReducer from "./services/searchTableNameSlice";
import searchComponentsFiltersReducer from "./services/searchComponentsFiltersSlice";
import additionParamsForFiltersReducer from "./services/additionParamsForFiltersSlice";
import filtersStoreReducer from "./services/filtersStoreSlice";

export const store = configureStore({
  reducer: {
    wishListReducer,
    searchTableNameReducer,
    searchComponentsFiltersReducer,
    additionParamsForFiltersReducer,
    filtersStoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
