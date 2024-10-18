import { configureStore } from "@reduxjs/toolkit";

import searchTableNameReducer from "./services/searchTableNameSlice";
import searchComponentsFiltersReducer from "./services/searchComponentsFiltersSlice";
import additionalParamsForFiltersReducer from "./services/additionalParamsForFiltersSlice";
import filtersStoreReducer from "./services/filtersStoreSlice";
import componentsStoreReducer from "./services/componentsStoreSlice";
import wishlistReducer from "./services/wishlistSlice";

export const store = configureStore({
  reducer: {
    searchTableNameReducer,
    searchComponentsFiltersReducer,
    additionalParamsForFiltersReducer,
    filtersStoreReducer,
    componentsStoreReducer,
    wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
