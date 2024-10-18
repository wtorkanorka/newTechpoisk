"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import comparisonIconBlack from "@/app/assets/icons/comparison-icon-black.svg";
import wishlistIconBlack from "@/app/assets/icons/wishlist-icon-black.svg";
import catalogIconWhite from "@/app/assets/icons/catalog-icon-white.png";
import magnifierBlue from "@/app/assets/icons/magnifier-blue.svg";
import ModalPortal from "../../modalPortal/ModalPortal";
import { CatalogComponent } from "../../catalogComponent/CatalogComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderSecondLayer() {
  const [inputFielText, setInputFieldText] = useState("");
  const [showCatalog, setShowCatalog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function HandleSubmit() {
    setInputFieldText(inputRef.current?.value || "");
  }
  const pathname = usePathname();
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

          <Link
            href={"/wishlist"}
            className="flex flex-col items-center hover:opacity-50"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.2003 6.23296C23.8753 4.90815 22.1189 4.09956 20.2483 3.95325C18.3777 3.80695 16.5163 4.33257 15.0003 5.43517C13.4099 4.2555 11.4303 3.72058 9.46024 3.93813C7.49016 4.15568 5.67589 5.10955 4.38281 6.60765C3.08973 8.10575 2.41387 10.0368 2.49135 12.0119C2.56882 13.9871 3.39387 15.8596 4.80034 17.2523L12.5628 25.0058C13.2129 25.6438 14.0883 26.0013 15.0003 26.0013C15.9124 26.0013 16.7878 25.6438 17.4378 25.0058L25.2003 17.2523C26.6598 15.788 27.479 13.8073 27.479 11.7427C27.479 9.67805 26.6598 7.69731 25.2003 6.23296ZM23.4378 15.5321L15.6753 23.2731C15.587 23.3621 15.4819 23.4327 15.366 23.4809C15.2502 23.529 15.1259 23.5539 15.0003 23.5539C14.8748 23.5539 14.7505 23.529 14.6347 23.4809C14.5188 23.4327 14.4137 23.3621 14.3253 23.2731L6.56284 15.4947C5.58254 14.4954 5.03361 13.1531 5.03361 11.7551C5.03361 10.3572 5.58254 9.0148 6.56284 8.01551C7.56179 7.03197 8.90906 6.48048 10.3128 6.48048C11.7166 6.48048 13.0639 7.03197 14.0628 8.01551C14.179 8.13234 14.3173 8.22508 14.4696 8.28836C14.6219 8.35165 14.7853 8.38423 14.9503 8.38423C15.1154 8.38423 15.2787 8.35165 15.4311 8.28836C15.5834 8.22508 15.7216 8.13234 15.8378 8.01551C16.8368 7.03197 18.1841 6.48048 19.5878 6.48048C20.9916 6.48048 22.3389 7.03197 23.3378 8.01551C24.3316 9.0017 24.8986 10.3368 24.9173 11.7348C24.936 13.1328 24.4049 14.4825 23.4378 15.4947V15.5321Z"
                fill={pathname == "/wishlist" ? "#FF5252" : "black"}
              />
            </svg>
            <p
              className={`font-[300] text-[20px] ${
                pathname == "/wishlist" ? "text-[#FF5252]" : "text-[black]"
              }`}
            >
              Избранное
            </p>
          </Link>
        </div>
      </div>

      <ModalPortal
        onClose={() => {
          setShowCatalog((prev) => !prev);
        }}
        isOpen={showCatalog}
        innerClasses="self-start mx-[15px] h-[60vh] mt-[158px] max-lg:h-[80vh] max-lg:self-center max-lg:mt-[0] lg:!h-auto"
      >
        <CatalogComponent />
      </ModalPortal>
    </>
  );
}
