"use client";

import Link from "next/link";

import React, { useEffect } from "react";

export function NavigationComponent({ currentPage }: { currentPage: string }) {
  // const dispatch = useAppDispatch();

  function getNameOfPage() {
    switch (currentPage) {
      case "about":
        // localStorage.setItem("currentPageForFooter", "about");

        return "О компании";
      case "contacts":
        // localStorage.setItem("currentPageForFooter", "contacts")
        return "Контакты";
      case "partners":
        // localStorage.setItem("currentPageForFooter", "partners")
        return "Партнёры";
      case "identity":
        // localStorage.setItem("currentPageForFooter", "identity");

        return "Персональные данные";
      case "52nogletchergang":
        // localStorage.setItem("currentPageForFooter", "52nogletchergang")
        return "Обратная связь";
      case "delivery":
        // localStorage.setItem("currentPageForFooter", "delivery");

        return "Оплата и доставка";
    }
  }

  return (
    <>
      <div className="flex flex-col py-[13px] bg-[white] items-start gap-[20px] rounded-[20px] border-solid border-[1px] border-[#DDE1E7] min-w-[217px] max-lg:hidden">
        <Link href="/about" className={`w-full px-[13px] relative`}>
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left ${
              currentPage === "about" && "text-[#0260E8]"
            }`}
            // onClick={() => dispatch(changeCurrentPage("about"))}
          >
            О компании
          </button>
          {/* {currentPage === "about" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )} */}
        </Link>
        <Link href="/contacts" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left  ${
              currentPage === "contacts" && "text-[#0260E8]"
            }`}
            // onClick={() => dispatch(changeCurrentPage("contacts"))}
          >
            Контакты
          </button>
          {/* {currentPage === "contacts" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )} */}
        </Link>
        <Link href="/partners" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left  ${
              currentPage === "partners" && "text-[#0260E8]"
            }`}
            // onClick={() => dispatch(changeCurrentPage("partners"))}
          >
            Партнёрам
          </button>
          {/* {currentPage === "partners" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )} */}
        </Link>
        <Link href="/identity" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] whitespace-nowrap w-full text-left  ${
              currentPage === "identity" && "text-[#0260E8]"
            }`}
            // onClick={() => dispatch(changeCurrentPage("identity"))}
          >
            Персональные данные
          </button>
          {/* {currentPage === "identity" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )} */}
        </Link>
        <Link href="/52nogletchergang" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left  ${
              currentPage === "52nogletchergang" && "text-[#0260E8]"
            }`}
            // onClick={() => dispatch(changeCurrentPage("52nogletchergang"))}
          >
            Обратная связь
          </button>
          {/* {currentPage === "52nogletchergang" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )} */}
        </Link>
        <Link href="/delivery" className="w-full px-[13px] relative">
          <button
            className={`text-[19px] hover:text-[#0260E8] w-full text-left ${
              currentPage === "delivery" && "text-[#0260E8]"
            }`}
            // onClick={() => dispatch(changeCurrentPage("delivery"))}
          >
            Оплата и доставка
          </button>
          {/* {currentPage === "delivery" && (
            <div
              className={`absolute h-full w-1 bg-[#0260E8] top-0 left-0 rounded-[5px] max-lg:hidden`}
            />
          )} */}
        </Link>
      </div>

      <p className="w-full border-solid border-b-[2px] border-[#D9D9D9] pb-[1px] text-[22px] lg:hidden">
        {getNameOfPage()}
      </p>
    </>
  );
}
