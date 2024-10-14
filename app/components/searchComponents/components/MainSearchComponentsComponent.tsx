import React from "react";
import { SearchComponentsInput } from "./SearchComponentsInput";
import { SearchComponentActiveFilters } from "../../searchComponentActiveFilters/SearchComponentActiveFilters";
import Image from "next/image";
import { SelectFilterComponent } from "../../selectFilterComponent/SelectFilterComponent";
import { ISelectFilterComponent } from "@/app/types";
import { ProductRowComponent } from "../../productRowComponent/ProductRowComponent";
import { ProductContainer } from "./ProductContainer";
import { useFiltersName, useSearchTableName } from "@/app/hooks/hooks";

export function MainSearchComponentsComponent() {
  const { searchTableName } = useSearchTableName();
  const { filter, setFilter } = useFiltersName("searchComponents");

  const filtersArr: ISelectFilterComponent[] = [
    {
      type: "cheap",
      name: "Сначала дешёвые",
    },
    {
      type: "expensive",
      name: "Сначала дорогие",
    },
  ];
  return (
    <div className="flex flex-col gap-[7px] self-baseline max-w-[1000px] overflow-x-auto h-full">
      <SearchComponentActiveFilters />

      <SelectFilterComponent
        filters={filtersArr}
        componentName={"searchComponents"}
      />

      <ProductContainer />
    </div>
  );
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const searchTableName = await useSearchTableName();
//   const filtersName = await useFiltersName();

//   // Верните данные как пропсы
//   return {
//     props: {
//       searchTableName,
//       filtersName,
//     },
//   };
// };
