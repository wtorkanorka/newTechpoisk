"use client";
import React, { memo } from "react";
import heartGray from "@/assets/icons/heart-icon-gray.svg";
import Image from "next/image";
import { NavBarButton } from "./NavBarButton";
import { useIsMobileWindow } from "@/hooks/hooks";

export const NavBar = memo(() => {
  const { isMobileWindow } = useIsMobileWindow();
  return (
    <>
      {isMobileWindow && (
        <div className="grid grid-cols-3 fixed bottom-0 w-full bg-white border-t border-[#dde1e7] py-[7px] px-[23px] z-[100]">
          <NavBarButton
            title="Каталог"
            icon={"catalog"}
            page={"/CatalogPage"}
          />
          <NavBarButton title="Конфигуратор" icon={"configurator"} page={"/"} />
          <NavBarButton
            title="Избранное"
            icon={"wishlist"}
            page={"/Wishlist"}
          />
          {/* <NavBarButton
            title="Сравнение"
            icon={"comparison"}
            page={"/ComparisonPage"}
          /> */}
        </div>
      )}
    </>
  );
});
