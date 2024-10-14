import React, { memo, useCallback, useEffect, useMemo } from "react";
import { HiddenComponent } from "../hiddenComponent/HiddenComponent";
import { mockFilters } from "./mockdata";
import { IFilters } from "@/app/types";
import { FilterInputContainer } from "./components/FilterInputContainer";
import {
  useAdditionParamsForFilters,
  useFetchFilters,
  useSearchTableName,
} from "@/app/hooks/hooks";
import axios from "axios";
import { Skeleton } from "../skeleton/Skeleton";
export const FilterPanel = memo(() => {
  const { searchTableName } = useSearchTableName();

  const { filtersState } = useAdditionParamsForFilters();
  const { isLoading, error, data, refetch } = useFetchFilters({
    searchTableName,
  });
  return (
    <div className="h-full overscroll-contain flex flex-col gap-[25px] max-w-[241px] min-w-full">
      {!isLoading &&
        !error &&
        data?.map((elem: IFilters) => {
          return elem.propertyCategories?.map((e) => {
            return e?.properties?.map((elem) => {
              return (
                <HiddenComponent title={elem.name} key={elem.id}>
                  <FilterInputContainer element={elem} />
                </HiddenComponent>
              );
            });
          });
        })}
      {error && <p>Ошибка при получении фильтров</p>}
      {isLoading && (
        <>
          <div className="flex flex-col gap-[10px]">
            <Skeleton isFull={true} height={10} />
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Skeleton isFull={true} height={10} />
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Skeleton isFull={true} height={10} />
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
            <div className="flex items-center gap-[5px]">
              <Skeleton width={14} height={14} />
              <Skeleton isFull={true} height={14} />
            </div>
          </div>
        </>
      )}
    </div>
  );
});
