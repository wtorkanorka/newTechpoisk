"use client";

import {
  useComponentsStore,
  useFiltersName,
  useFiltersStore,
  useSearchTableName,
} from "@/app/hooks/hooks";
import React, { useCallback, useEffect, useState } from "react";
import closeIconGray from "@/app/assets/icons/close-icon-gray.svg";
import Image from "next/image";
import { SearchComponentsHeader } from "./components/SearchComponentsHeader";
import { FilterPanel } from "../filterPanel/FilterPanel";
import { MainSearchComponentsComponent } from "./components/MainSearchComponentsComponent";
import { SearchComponentsInput } from "./components/SearchComponentsInput";
import { SearchComponentsFiltersLeftPart } from "./components/SearchComponentsFiltersLeftPart";
import { IComponentsGlobal } from "@/app/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import { groupBy, debounce } from "lodash";

interface ISearchComponents {
  onClose?: () => void;
}
export function SearchComponents<T extends ISearchComponents>({
  onClose,
}: T): React.ReactNode {
  const pathname = usePathname();
  const [expandFilter, setExpandFilter] = useState(false);
  const [compatibleState, setCompatibleState] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState("");
  const [minPriceState, setMinPriceState] = useState(0);
  const [maxPriceState, setMaxPriceState] = useState(100000);
  const [countOfComponents, setCountOfComponents] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<IComponentsGlobal | null>(null);

  const { searchTableName } = useSearchTableName();
  const { filtersStore } = useFiltersStore();
  const { filter } = useFiltersName("searchComponents");
  const { getAllIds } = useComponentsStore();

  // const linkFromFilters = groupBy(filtersStore[searchTableName.slug], "containerName")
  function getLinkFromFilters() {
    const groupFiltersObject = groupBy(
      filtersStore[searchTableName.slug],
      "containerName"
    );
    const result = Object.keys(groupFiltersObject)
      .map((key) => {
        const filterNames = groupFiltersObject[key]
          .map((item) => item.filterName)
          .join(",");
        return `&${key}=${filterNames}`;
      })
      .join("");
    return result;
  }

  async function getProductData() {
    const allIdsArr = getAllIds();
    const componentType =
      pathname === "/"
        ? `&componentType=${searchTableName.slug}`
        : "&componentType=processor"; //TODO: Если на странице конфигуратора то из стейта, если на странице поиска, то из ссылки
    const searchInputValue = searchInput !== "" ? `&search=${searchInput}` : "";
    const ordering = `&ordering=${filter.searchComponents.type}`;
    const minPrice = `&minPrice=${minPriceState * 100}`;
    const maxPrice = `&maxPrice=${maxPriceState * 100}`;
    const compatibleWith =
      compatibleState === true && allIdsArr.length !== 0
        ? `&compatibleWith=${allIdsArr.join(",")}`
        : "";
    const hideIncompatible = "&hideIncompatible=true";
    const linkFromFilters = getLinkFromFilters();
    const hideNonShortProps = "&hide_non_short_props=true";

    try {
      setIsLoading(true);
      setIsError(false);

      const response = await axios.get(
        `https://techpoisk.com:8443/components?page=1&pageSize=5${componentType}${searchInputValue}${ordering}${minPrice}${maxPrice}${compatibleWith}${hideIncompatible}${linkFromFilters}${hideNonShortProps}`
      );
      const data: IComponentsGlobal = response.data;
      setCountOfComponents(data.count);
      setData(data);
    } catch (error) {
      console.log(error);

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductData();
  }, [
    searchTableName.slug,
    filter.searchComponents.type,
    filtersStore[searchTableName.slug],
    compatibleState,
    searchInput,
    minPriceState,
    maxPriceState,
  ]);

  useEffect(() => {
    setSearchInput("");
  }, [filtersStore[searchTableName.slug]]);
  return (
    <div className="flex flex-col max-h-full h-full max-w-full lg:w-full justify-center">
      <SearchComponentsHeader
        onClose={onClose}
        headerName={searchTableName}
        setExpandFilter={setExpandFilter}
        countOfComponents={countOfComponents}
      />

      <div className="flex justify-between items-center gap-[40px] max-lg:gap-[10px] h-full  pt-[23px] max-h-[calc(100%-18px-23px-16px-10px)]">
        <SearchComponentsFiltersLeftPart
          expandFilter={expandFilter}
          setExpandFilter={setExpandFilter}
          setCompatibleState={setCompatibleState}
          compatibleState={compatibleState}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          priceState={{
            minPriceState,
            setMinPriceState,
            maxPriceState,
            setMaxPriceState,
          }}
        />
        <MainSearchComponentsComponent
          fetchStates={{ isLoading, isError, data }}
        />
      </div>
    </div>
  );
}
