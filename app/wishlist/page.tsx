"use client";
import React, { useEffect, useRef, useState } from "react";

import { useFiltersName, useWishlistStore } from "../../hooks/hooks";

import { WishListComponentRow } from "./components/WishListComponentRow";
import { IWishList } from "../../redux/services/wishlistSlice";
import { SelectFilterComponent } from "../../components/selectFilterComponent/SelectFilterComponent";
import { ISelectFilterComponent } from "../types";
import {
  configuratorType,
  WishListAssemblyRow,
} from "./components/WishListAssemblyRow";

export default function Wishlist() {
  const [data, setData] = useState<IWishList[] | []>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedData, setSelectedData] = useState<IWishList[]>([]);
  const [showOnlyAssembly, setShowOnlyAssembly] = useState<boolean>(true);
  const [showOnlyComponents, setShowOnlyComponents] = useState<boolean>(true);

  const { wishlistStore, deleteFromWishlist } = useWishlistStore();
  const { filter } = useFiltersName("wishlist");

  const wishlistComponentsRef = useRef<any>(null);

  function selectAllCheckboxes() {
    if (wishlistComponentsRef.current) {
      wishlistComponentsRef.current.querySelectorAll(
        'input[type="checkbox"]'
      ) &&
        Array.from(
          wishlistComponentsRef.current.querySelectorAll(
            'input[type="checkbox"]'
          )
        ).map((input: any) => {
          input.checked = selectAll;
        });
    }
    if (selectAll) {
      setSelectedData(data);
    } else {
      setSelectedData([]);
    }
  }
  function sortedAndFilteredArr(
    arr: {
      component: any;
      name: string;
      isAssembly: boolean;
      price: number;
      id: string | number;
    }[]
  ) {
    const { type, name } = filter.wishlist;

    const filteredArr = arr.filter((item) => {
      if (!showOnlyComponents && !item.isAssembly) return false;
      if (!showOnlyAssembly && item.isAssembly) return false;
      return true;
    });

    const sortedArr = filteredArr.sort((a, b) => {
      switch (type) {
        case "price":
          return a.price - b.price;
        case "-price":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return sortedArr;
  }
  function handleDeleteSelectedData(data: IWishList[]): void {
    sortedAndFilteredArr(data).forEach((elem) => {
      deleteFromWishlist({ id: String(elem.id) });
    });
  }
  useEffect(() => {
    setData(wishlistStore);
  }, [wishlistStore]);
  useEffect(() => {
    selectAllCheckboxes();
  }, [selectAll]);

  const filtersArr: ISelectFilterComponent[] = [
    {
      type: "price",
      name: "Сначала дешёвые",
    },
    {
      type: "-price",
      name: "Сначала дорогие",
    },
    {
      type: "name",
      name: "По названию (А-Я)",
    },
    {
      type: "nameDesc",
      name: "По названию (Я-А)",
    },
  ];

  return (
    <div className="pb-[61px] flex gap-[40px] justify-between max-lg:flex-col max-lg:gap-[15px]">
      <div className="flex flex-col ">
        <h1 className="mb-[20px] text-[32px] font-[400] max-lg:text-[20px] whitespace-nowrap">
          Избранное {<span className="text-[#9e9e9e]">({data.length})</span>}
        </h1>
        <div className="flex flex-col gap-[14px] items-start">
          <p className="text-[20px] font-[400]">Показать</p>
          <div className="flex flex-col gap-[5px] items-start">
            <label className="flex items-center gap-[4px]">
              <input
                type="checkbox"
                name="filter"
                className="min-w-[14px]"
                checked={showOnlyAssembly}
                onChange={() => setShowOnlyAssembly((prev) => !prev)}
              />
              <p className="text-[20px] font-[300]">Сборки</p>
            </label>
            <label className="flex items-center gap-[4px]">
              <input
                type="checkbox"
                name="fitler"
                className="min-w-[14px]"
                checked={showOnlyComponents}
                onChange={() => setShowOnlyComponents((prev) => !prev)}
              />
              <p className="text-[20px] font-[300]">Комлектующие</p>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-[68px] max-lg:mt-0">
        <div className="flex justify-start gap-[10px] max-lg:flex-wrap">
          <label className="flex items-center gap-[6px] mr-[86px] hover:opacity-50">
            <input
              type="checkbox"
              className="min-w-[16px]"
              checked={selectAll}
              onChange={() => {
                setSelectAll((prev) => !prev);
              }}
            />{" "}
            <p className="text-[20px] font-[300] text-[#9e9e9e]">Выбрать все</p>
          </label>

          <button
            className="text-[#9e9e9e] text-[18px] font-[300] hover:opacity-50 mr-auto"
            onClick={() => handleDeleteSelectedData(selectedData)}
          >
            Удалить
          </button>
          <SelectFilterComponent
            filters={filtersArr}
            componentName="wishlist"
          />
        </div>
        <div className="flex flex-col" ref={wishlistComponentsRef}>
          {sortedAndFilteredArr(data).map((element) => {
            if (element.isAssembly !== true) {
              return (
                <WishListComponentRow
                  key={element.id}
                  product={element}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                />
              );
            } else {
              return (
                <WishListAssemblyRow
                  key={element.id}
                  product={element as unknown as configuratorType}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
