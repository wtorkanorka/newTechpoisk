import React, { useEffect, useState } from "react";
import { SaveButtonComponent } from "../saveButtonComponent/SaveButtonComponent";
import heartWhiteIcon from "@/assets/icons/heart-white-icon.svg";
import comparisonWhiteIcon from "@/assets/icons/comparison-icon-white.svg";
import { useComponentsStore, useWishlistStore } from "@/hooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import ModalPortal from "../modalPortal/ModalPortal";
import { IComponentsResultsInStore } from "@/app/types";
import Image from "next/image";
import settingImg from "@/assets/icons/settingImg.svg";
import Link from "next/link";

export function BuyConfigurationComponent() {
  const [price, setPrice] = useState(0);
  const [addedToWishList, setAddedToWishList] = useState(false);
  const { componentsStore, getPriceOfConfigurator } = useComponentsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addAssemblyToWishlist } = useWishlistStore();
  useEffect(() => {
    setPrice(getPriceOfConfigurator() || 0);
  }, [componentsStore]);

  useEffect(() => setAddedToWishList(false), [componentsStore]);
  function handleCloseModal() {
    return setIsModalOpen(false);
  }
  function extractComponentsFromStore(): IComponentsResultsInStore[] {
    const arr = Object.values(componentsStore).flat();

    return arr;
  }

  return (
    <>
      <div className="rounded-[20px] flex flex-col gap-[20px] border-[1px] border-[#dde1e7] px-[25px] py-[20px] mb-[10px] max-lg:border-none max-lg:p-0 max-lg:mt-[9px]">
        <button
          onClick={() => {
            if (price !== 0) {
              setIsModalOpen((prev) => !prev);
            }
          }}
          className="w-full py-[12px] px-[26px] rounded-[38px] bg-[#0260E8] text-[white] text-[20px] font-[600] text-nowrap max-lg:w-full max-lg:flex max-lg:justify-between max-lg:items-center hover:opacity-50"
        >
          Купить сборку <span>{price.toLocaleString()} ₽</span>
        </button>
        <button
          onClick={() => {
            if (!addedToWishList) {
              addAssemblyToWishlist({
                component: componentsStore,
                price: price,
                name: "Сборка",
                id: nanoid(),
                isAssembly: true,
              });
              setAddedToWishList(true);
            }
          }}
          className={`flex justify-between items-center gap-[5px] max-lg:hidden`}
        >
          <p className="text-[17px] font-[600] whitespace-nowrap">
            Сохранить конфигурацию
          </p>
          {heartWhiteIcon && (
            <SaveButtonComponent
              icon={heartWhiteIcon}
              isActive={addedToWishList}
              alt={"Сохранить конфигурацию"}
            />
          )}
        </button>
        {/* <div className="flex justify-between items-center gap-[5px] max-lg:hidden">
          <p className="text-[17px] font-[600]">Добавить в сравнение</p>
          {comparisonWhiteIcon && (
            <SaveButtonComponent
              icon={comparisonWhiteIcon}
              isActive={false}
              alt={"Добавить в сравнение"}
            />
          )}
        </div> */}
      </div>
      <ModalPortal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        classes="max-h-full"
        innerClasses="!h-[60vh]"
      >
        <div className="flex flex-col w-full overflow-y-auto max-h-full overscroll-contain">
          {extractComponentsFromStore().map((elem) => {
            return (
              <div
                key={elem.selectedOffer.id}
                className="flex items-center justify-between border-b border-solid border-gray-300  py-[24px] "
              >
                <Link
                  href={`/ProductCard/${elem.id}`}
                  className="flex items-center"
                >
                  <Image
                    src={
                      elem.pictures && elem.pictures[0] && elem.pictures[0].url
                        ? elem.pictures[0].url
                        : settingImg
                    }
                    width={72}
                    height={72}
                    alt="logo component"
                    className="max-lg:w-[30px] max-lg:h-[30px]"
                  />
                  <div className="flex flex-col gap-[6px] max-w-[495px] ml-[28px] max-lg:ml-[5px] mr-[10px]">
                    <h3 className="max-lg:text-[12px] w-full">{elem.name}</h3>
                    {/* <div className="flex gap-[5px] flex-wrap max-lg:hidden">
                      {elem.?.map((e: any, index: number) => {
                        return (
                          <p className="text-[14px] text-[#9e9e9e]" key={index}>
                            {e.value}
                          </p>
                        );
                      })}
                    </div> */}
                  </div>
                </Link>
                <a
                  target="_blank"
                  href={
                    (elem.selectedOffer &&
                      elem.selectedOffer &&
                      elem.selectedOffer.buyLink) ||
                    ""
                  }
                  className="whitespace-nowrap flex items-center gap-[10px] text-[white] text-[20px] rounded-[38px] bg-[#0260e8] py-[12px] px-[35px] max-lg:text-[14px] max-lg:py-[7px] max-lg:px-[21px] hover:bg-[#599eff]"
                >
                  В магазин{" "}
                  {/* <Image
                    src={externalLink}
                    width={24}
                    height={24}
                    alt="externalLink"
                    className="max-lg:hidden"
                  /> */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="max-lg:hidden"
                  >
                    <path
                      d="M11 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 12L21 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 9V3H15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </ModalPortal>
    </>
  );
}
