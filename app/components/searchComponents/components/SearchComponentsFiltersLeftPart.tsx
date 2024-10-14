"use client";
import React, { memo, useState } from "react";
import { SearchComponentsInput } from "./SearchComponentsInput";
import { FilterPanel } from "../../filterPanel/FilterPanel";
import {
  useAdditionParamsForFilters,
  useIsMobileWindow,
  useSearchTableName,
} from "@/app/hooks/hooks";
import Image from "next/image";

interface ISearchComponentsFiltersLeftPart {
  expandFilter: boolean;
  setExpandFilter: (value: boolean) => void;
}

export const SearchComponentsFiltersLeftPart = memo(
  ({ expandFilter, setExpandFilter }: ISearchComponentsFiltersLeftPart) => {
    const { isMobileWindow } = useIsMobileWindow();
    const { searchTableName } = useSearchTableName();
    const { filtersState, toggleFilter } = useAdditionParamsForFilters();

    return (
      <div
        className={`${
          //   isMobileWindow && !expandFilter ? "hidden" : ""
          isMobileWindow && !expandFilter
            ? "translate-x-[-200%] w-[0px]"
            : "min-w-[230px] "
        } overflow-y-auto ${
          isMobileWindow && expandFilter
            ? "translate-x-[0%] fixed inset-0 w-full overscroll-contain bg-[white] overflow-y-auto p-[10px] pb-[61px] z-[5]"
            : ""
        } flex flex-col items-start h-full max-lg:h-[calc(100%-61px)] transition-all`}
      >
        {isMobileWindow && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setExpandFilter(false);
            }}
            className="top-[66px] left-[100%] sticky hover:opacity-50"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 5.5L16.5 16.5"
                stroke="black"
                strokeLinecap="round"
              />
              <path
                d="M16.5 5.5L5.5 16.5"
                stroke="black"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        <SearchComponentsInput />
        <h3 className="text-[20px] font-[600] mt-[21px]">Фильтры</h3>
        <label className="flex items-center gap-[4px] w-full hover:opacity-60 select-none">
          <input type="checkbox" name="" id="" defaultChecked={true} />{" "}
          <p className="text-[20px] font-[300]">Совместимо</p>
        </label>
        {searchTableName.slug === "hdd,ssd" && (
          <>
            <label className="flex items-center gap-[4px] w-full hover:opacity-60 select-none text-left">
              <input
                type="checkbox"
                name=""
                id=""
                checked={filtersState["hdd"]}
                onChange={() => {
                  toggleFilter("hdd");
                }}
              />{" "}
              <p className="text-[20px] font-[300]">Жёсткий диск</p>
            </label>
            <label className="flex items-center gap-[4px] w-full hover:opacity-60 select-none text-left">
              <input
                type="checkbox"
                name=""
                id=""
                checked={filtersState["ssd"]}
                onChange={() => {
                  toggleFilter("ssd");
                }}
              />{" "}
              <p className="text-[20px] font-[300]">SSD накопитель</p>
            </label>
          </>
        )}
        {searchTableName.slug === "cooler,liquid_cooling,case_fans" && (
          <>
            <label className="flex items-center gap-[4px] w-full hover:opacity-60 select-none text-left">
              <input
                type="checkbox"
                name=""
                id=""
                checked={filtersState.cooler}
                onChange={() => {
                  toggleFilter("cooler");
                }}
              />{" "}
              <p className="text-[20px] font-[300]">Кулеры для процессора</p>
            </label>
            <label className="flex items-center gap-[4px] w-full hover:opacity-60 select-none text-left">
              <input
                type="checkbox"
                name=""
                id=""
                checked={filtersState.liquid_cooling}
                onChange={() => {
                  toggleFilter("liquid_cooling");
                }}
              />{" "}
              <p className="text-[20px] font-[300]">
                Система жидкостного охлаждения (СЖО)
              </p>
            </label>
            <label className="flex items-center gap-[4px] w-full hover:opacity-60 select-none text-left">
              <input
                type="checkbox"
                name=""
                id=""
                checked={filtersState.case_fans}
                onChange={() => {
                  toggleFilter("case_fans");
                }}
              />{" "}
              <p className="text-[20px] font-[300]">Кулеры для корпуса</p>
            </label>
          </>
        )}

        <div className="pb-[10px] w-full">
          <h4 className="text-[20px] font-[600] text-left">Цена</h4>
          <div className="flex gap-[5px] items-center">
            <input
              type="text"
              placeholder="От"
              className="py-[6px] px-[20px] border border-[#dde1e7] rounded-[25px] outline-none w-full"
            />
            <input
              type="text"
              placeholder="До"
              className="py-[6px] px-[20px] border border-[#dde1e7] rounded-[25px] outline-none w-full"
            />
          </div>
        </div>

        <FilterPanel />
      </div>
    );
  }
);
