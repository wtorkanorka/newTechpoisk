"use client";
import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";
import { useWishlistStore } from "../hooks/hooks";
import { ProductRowComponent } from "../components/productRowComponent/ProductRowComponent";
import { WishListComponentRow } from "./components/WishListComponentRow";

export default function Wishlist() {
  const [renderItem, setRenderItem] = useState(false);
  const { wishlistStore } = useWishlistStore();
  useEffect(() => {
    setRenderItem(true);
  }, []);
  return (
    <div className="pb-[61px] flex gap-[40px] justify-between max-lg:flex-col max-lg:gap-[15px]">
      <div className="flex flex-col ">
        <h1 className="mb-[20px] text-[32px] font-[400] max-lg:text-[20px]">
          Избранное <span className="text-[#9e9e9e]">(2)</span>
        </h1>
        <div className="flex flex-col gap-[14px] items-start">
          <p className="text-[20px] font-[400]">Показать</p>
          <div className="flex flex-col gap-[5px] items-start">
            <label className="flex items-center gap-[4px]">
              <input type="checkbox" name="filter" className="min-w-[14px]" />
              <p className="text-[20px] font-[300]">Сборки</p>
            </label>
            <label className="flex items-center gap-[4px]">
              <input type="checkbox" name="fitler" className="min-w-[14px]" />
              <p className="text-[20px] font-[300]">Комлектующие</p>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div>Фильтры</div>
        <div className="flex flex-col">
          {renderItem &&
            wishlistStore.map((element) => {
              return (
                <WishListComponentRow key={element.id} product={element} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
