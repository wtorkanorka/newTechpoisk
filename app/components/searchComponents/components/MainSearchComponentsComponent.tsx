import React, { memo } from "react";
import { SearchComponentsInput } from "./SearchComponentsInput";
import { SearchComponentActiveFilters } from "../../searchComponentActiveFilters/SearchComponentActiveFilters";
import Image from "next/image";
import { SelectFilterComponent } from "../../selectFilterComponent/SelectFilterComponent";
import { IComponentsGlobal, ISelectFilterComponent } from "@/app/types";
import { ProductRowComponent } from "../../productRowComponent/ProductRowComponent";
import { ProductContainer } from "./ProductContainer";
import {
  useComponentsStore,
  useFiltersName,
  useSearchTableName,
} from "@/app/hooks/hooks";

interface IMainSearchComponentsComponent {
  fetchStates: {
    isLoading: boolean;
    isError: boolean;
    data: IComponentsGlobal | null;
  };
}

export const MainSearchComponentsComponent = memo(
  ({ fetchStates }: IMainSearchComponentsComponent) => {
    const { searchTableName } = useSearchTableName();
    const { filter, setFilter } = useFiltersName("searchComponents");

    const filtersArr: ISelectFilterComponent[] = [
      {
        type: "price",
        name: "Сначала дешёвые",
      },
      {
        type: "-price",
        name: "Сначала дорогие",
      },
    ];
    return (
      <div className="flex flex-col gap-[7px] self-baseline max-lg:max-w-[1000px] overflow-x-auto h-full lg:w-full">
        <SearchComponentActiveFilters />

        <SelectFilterComponent
          filters={filtersArr}
          componentName={"searchComponents"}
        />

        <ProductContainer fetchStates={fetchStates} />
      </div>
    );
  }
);
