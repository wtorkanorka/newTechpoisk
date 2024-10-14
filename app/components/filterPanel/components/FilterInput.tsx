"use client";
import {
  namesSearchTableName,
  useAdditionParamsForFilters,
  useFiltersStore,
  useSearchTableName,
} from "@/app/hooks/hooks";

import { IFiltersValues } from "@/app/types";
import React, {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";

export const FilterInput = memo(
  ({
    value,
    containerName,
  }: {
    value: IFiltersValues;
    containerName: string;
  }) => {
    const {
      searchTableName,
    }: { searchTableName: { slug: namesSearchTableName } } =
      useSearchTableName();
    const { filtersState } = useAdditionParamsForFilters();
    const { filtersStore, addFilter, deleteFilterFromStore } =
      useFiltersStore();
    const [isChecked, setIsChecked] = useState(false);
    const isExist = ({ slug }: { slug: string }): boolean => {
      return filtersStore[slug].some(
        (filter: { filterName: string; containerName: string }) =>
          filter.filterName == String(value.value) &&
          filter.containerName == containerName
      );
    };
    useEffect(() => {
      setIsChecked(isExist({ slug: searchTableName.slug }));
    }, [filtersStore[searchTableName.slug]]);

    return (
      <label className="flex gap-[4px] items-center w-full hover:opacity-60 select-none">
        <input
          type="checkbox"
          className="min-w-[16px] min-h-[16px]"
          checked={isChecked}
          onChange={() => {
            if (isChecked) {
              startTransition(() => {
                deleteFilterFromStore({
                  searchTableName: searchTableName.slug,
                  containerName,
                  filterName: String(value.value),
                });
              });
            } else {
              startTransition(() => {
                addFilter({
                  searchTableName: searchTableName.slug,
                  containerName,
                  filterName: String(value.value),
                });
              });
            }
          }}
        />
        <p className="text-[20px] font-[300] text-left text-wrap break-all">
          {value.value}{" "}
          {value?.count && (
            <span className="text-[#9e9e9e]">({value?.count})</span>
          )}
        </p>
      </label>
    );
  }
);
