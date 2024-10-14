"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import comparisonIconBlack from "@/app/assets/icons/comparison-icon-black.svg";
import wishlistIconBlack from "@/app/assets/icons/wishlist-icon-black.svg";
import catalogIconWhite from "@/app/assets/icons/catalog-icon-white.png";
import magnifierBlue from "@/app/assets/icons/magnifier-blue.svg";
import ModalPortal from "../../modalPortal/ModalPortal";
import { CatalogComponent } from "../../catalogComponent/CatalogComponent";

export function HeaderSecondLayer() {
  const [inputFielText, setInputFieldText] = useState("");
  const [showCatalog, setShowCatalog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function HandleSubmit() {
    setInputFieldText(inputRef.current?.value || "");
  }

  return (
    <>
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-[15px] w-full">
          <button
            onClick={(event) => {
              event.stopPropagation();
              setShowCatalog((prev) => !prev);
            }}
            className="rounded-[38px] bg-[#0260e8] flex gap-[34px] items-center px-[20px] py-[12px] font-[600] text-[20px] text-[white] min-w-[185px] hover:opacity-50 max-lg:hidden"
          >
            Каталог
            <Image
              src={catalogIconWhite}
              width={29}
              height={37}
              alt="Каталог"
            />
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
            }}
            className="border border-[#0260e8] border-1 rounded-[37px] h-full max-lg:h-[32px] w-full flex items-center px-[25px] py-[14px] mr-[84px] max-lg:mx-auto max-lg:rounded-[16px] max-lg:px-[15px] max-lg:py-[8px]"
          >
            <input
              type="text"
              className="w-full outline-none border-none mr-[25px] placeholder-[#9e9e9e] text-[17px] max-lg:mr-[15px] max-lg:hidden bg-[transparent]"
              ref={inputRef}
              value={inputFielText}
              onChange={(e) => {
                setInputFieldText(e.target.value);
              }}
              placeholder="Поиск по сайту"
            />
            <input
              type="text"
              className="w-full outline-none border-none mr-[25px] placeholder-[#9e9e9e] text-[11px] max-lg:mr-[15px] lg:hidden bg-[transparent]"
              ref={inputRef}
              value={inputFielText}
              onChange={(e) => {
                setInputFieldText(e.target.value);
              }}
              placeholder="Поиск"
            />
            <button
              type="submit"
              onSubmit={(e) => {
                e.preventDefault();
                HandleSubmit();
              }}
            >
              <Image
                src={magnifierBlue}
                width={23}
                height={23}
                alt="Найти"
                className="max-lg:w-[15px] max-lg:h-[15px]"
              />
            </button>
          </form>
        </div>
        <div className="flex gap-[32px] items-center max-lg:hidden">
          <button className="flex flex-col items-center hover:opacity-50">
            <Image
              src={comparisonIconBlack}
              width={30}
              height={30}
              alt="Сравнение"
            />
            <p className="font-[300] text-[20px]">Сравнение</p>
          </button>

          <button className="flex flex-col items-center hover:opacity-50">
            <Image
              src={wishlistIconBlack}
              width={30}
              height={30}
              alt="Избранное"
            />
            <p className="font-[300] text-[20px]">Избранное</p>
          </button>
        </div>
      </div>

      <ModalPortal
        onClose={() => {
          setShowCatalog((prev) => !prev);
        }}
        isOpen={showCatalog}
        innerClasses="self-start mx-[15px] h-[60vh] mt-[158px] max-lg:h-[80vh] max-lg:self-center max-lg:mt-[0]"
      >
        <CatalogComponent />
      </ModalPortal>
    </>
  );
}
