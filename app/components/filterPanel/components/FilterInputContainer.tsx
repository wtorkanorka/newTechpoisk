import { IProperties } from "@/app/types";
import React, { memo, useCallback } from "react";
import { FilterInput } from "./FilterInput";
import { useFiltersStore, useSearchTableName } from "@/app/hooks/hooks";

export const FilterInputContainer = memo(
  ({ element }: { element: IProperties }) => {
    const { searchTableName } = useSearchTableName();
    const { filtersStore } = useFiltersStore();
    const renderItems = useCallback(() => {
      return element.values.map((value, index) => {
        return (
          <FilterInput value={value} key={index} containerName={element.slug} />
        );
      });
    }, [searchTableName.slug]);
    return <div key={element.id}>{renderItems()}</div>;
  }
);
