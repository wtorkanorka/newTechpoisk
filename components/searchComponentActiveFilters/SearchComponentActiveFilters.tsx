import { useFiltersStore, useSearchTableName } from "@/hooks/hooks";
import React from "react";

export const SearchComponentActiveFilters = () => {
  const { searchTableName } = useSearchTableName();
  const { filtersStore, deleteFilterFromStore, clearAllFilters } =
    useFiltersStore();
  return (
    <div
      className={`flex gap-[5px] max-w-full items-center overflow-x-auto pb-[10px] ${
        filtersStore[searchTableName.slug].length !== 0 ? "min-h-[57px]" : "h-0"
      }`}
    >
      {filtersStore[searchTableName.slug] &&
        filtersStore[searchTableName.slug].map(
          (
            activeFilter: { filterName: string; containerName: string },
            index: number
          ) => {
            return (
              <button
                key={index}
                onClick={() => {
                  deleteFilterFromStore({
                    searchTableName: searchTableName.slug,
                    filterName: activeFilter.filterName,
                    containerName: activeFilter.containerName,
                  });
                }}
                className="rounded-[32px] bg-[#dde1e7] py-[9px] px-[15px] h-full hover:opacity-50 select-none"
              >
                <p className="whitespace-nowrap">{activeFilter.filterName}</p>
              </button>
            );
          }
        )}
      {filtersStore[searchTableName.slug] &&
        filtersStore[searchTableName.slug].length !== 0 && (
          <button
            onClick={() => clearAllFilters({ searchTableName })}
            className="text-[#FF5252] font-[300] text-[16px] whitespace-nowrap ml-[10px] h-full py-[8px] px-[15px]"
          >
            Сбросить фильтры
          </button>
        )}
    </div>
  );
};
