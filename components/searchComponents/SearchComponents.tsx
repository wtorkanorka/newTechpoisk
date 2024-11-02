"use client";

import {
  useAdditionParamsForFilters,
  useComponentsStore,
  useDebounce,
  useFiltersName,
  useFiltersStore,
  useSearchTableName,
} from "@/hooks/hooks";
import React, { useCallback, useEffect, useState } from "react";
import closeIconGray from "@/assets/icons/close-icon-gray.svg";
import Image from "next/image";
import { SearchComponentsHeader } from "./components/SearchComponentsHeader";
import { FilterPanel } from "../filterPanel/FilterPanel";
import { MainSearchComponentsComponent } from "./components/MainSearchComponentsComponent";
import { SearchComponentsInput } from "./components/SearchComponentsInput";
import { SearchComponentsFiltersLeftPart } from "./components/SearchComponentsFiltersLeftPart";
import { IComponentsGlobal } from "@/app/types";
import axios from "axios";
import { usePathname } from "next/navigation";
import { groupBy } from "lodash";
import { useSearchParams } from "next/navigation";

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
  const [coolerState, setCoolerState] = useState(true);
  const [caseFansState, setCaseFansState] = useState(true);
  const [liquidCoolingState, setLiquidCoolingState] = useState(true);
  const [hddState, setHddState] = useState(true);
  const [ssdState, setSsdState] = useState(true);
  const [pageState, setPageState] = useState<number>(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dataState, setDataState] = useState<IComponentsGlobal | null>(null);

  const { searchTableName } = useSearchTableName();
  const { filtersStore } = useFiltersStore();
  const { filter } = useFiltersName("searchComponents");
  const { getAllIds } = useComponentsStore();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

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
    const componentTypeFrom =
      pathname == "/" ? searchTableName.slug : params.componentType;
    const changedComponentType =
      componentTypeFrom == "cooler,liquid_cooling,case_fans"
        ? `${
            coolerState && caseFansState && liquidCoolingState
              ? "cooler,liquid_cooling,case_fans"
              : coolerState && caseFansState && !liquidCoolingState
              ? "cooler,case_fans"
              : coolerState && !caseFansState && liquidCoolingState
              ? "cooler,liquid_cooling"
              : coolerState && !caseFansState && !liquidCoolingState
              ? "cooler"
              : !coolerState && caseFansState && liquidCoolingState
              ? "case_fans,liquid_cooling"
              : !coolerState && caseFansState && !liquidCoolingState
              ? "case_fans"
              : !coolerState && !caseFansState && liquidCoolingState
              ? "liquid_cooling"
              : "cooler,liquid_cooling,case_fans"
          }`
        : searchTableName.slug === "hdd,ssd"
        ? hddState && ssdState
          ? "hdd,ssd"
          : hddState && !ssdState
          ? "hdd"
          : !hddState && ssdState
          ? "ssd"
          : "hdd,ssd"
        : searchTableName.slug;
    const componentType = `&componentType=${changedComponentType}`;

    const searchInputValue = //Страница конфигуратора      | Страница поиска
      pathname == "/" // searchInput -> searchInput   params.search -> если инпут пуст то из params запрос
        ? searchInput !== "" //
          ? `&search=${searchInput}` //
          : "" //
        : params.search //
        ? searchInput === "" //
          ? `&search=${params.search}`
          : `&search=${searchInput}`
        : searchInput === ""
        ? ``
        : `&search=${searchInput}`;
    const additionalParamsForSearch =
      pathname == "/" ? "" : `&${params.otherParams || ""}`;
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
    const page = pageState;
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await axios.get(
        `https://techpoisk.com:8443/components?page=${page}&pageSize=5${componentType}${searchInputValue}${ordering}${minPrice}${maxPrice}${compatibleWith}${hideIncompatible}${linkFromFilters}${hideNonShortProps}${additionalParamsForSearch}`
      );
      const data: IComponentsGlobal = response.data;
      if (dataState !== null && page !== 1) {
        const newDataState = {
          count: data.count,
          countByValue: data.countByValue,
          maxPrice: data.maxPrice,
          minPrice: data.minPrice,
          next: data.next,
          previous: data.previous,
          pageSize: data.pageSize,
          results: [...dataState.results, ...data.results],
        };
        setDataState(newDataState);
      } else {
        setDataState(data);
      }
    } catch (error) {
      console.log(error);

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const debouncedHandleChange = useDebounce(() => {
    getProductData();
  }, 500); // Это блин работает :3
  useEffect(() => {
    setPageState(1);
    setDataState(null);
    debouncedHandleChange();
  }, [
    searchTableName.slug,
    filter.searchComponents.type,
    filtersStore[searchTableName.slug],
    compatibleState,
    searchInput,
    minPriceState,
    maxPriceState,
    coolerState,
    caseFansState,
    liquidCoolingState,
    hddState,
    ssdState,
  ]);
  useEffect(() => {
    debouncedHandleChange();
  }, [pageState]);
  useEffect(() => {
    setSearchInput("");
  }, [filtersStore[searchTableName.slug]]);
  useEffect(() => {
    if (isError) {
      setPageState(1);
      setDataState(null);
      debouncedHandleChange();
    }
  }, [isError]);
  return (
    <div className="flex flex-col max-h-full h-full max-w-full lg:w-full justify-center">
      <SearchComponentsHeader
        onClose={onClose}
        headerName={searchTableName}
        setExpandFilter={setExpandFilter}
        countOfComponents={dataState?.count || 0}
      />

      <div className="flex justify-between items-start gap-[40px] max-lg:gap-[10px] h-full  pt-[23px] max-h-[calc(100%-18px-23px-16px-10px)]">
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
          additionalFiltersState={{
            coolerState,
            caseFansState,
            liquidCoolingState,
            hddState,
            ssdState,
            setCoolerState,
            setCaseFansState,
            setLiquidCoolingState,
            setHddState,
            setSsdState,
          }}
        />
        <MainSearchComponentsComponent
          fetchStates={{ isLoading, isError, dataState }}
          setPageState={setPageState}
        />
      </div>
    </div>
  );
}
