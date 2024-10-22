"use client";
import styles from "./style.module.css";
import { PriceBlock } from "./components/PriceBlock/PriceBlock";
import { SelectImage } from "./components/SelectImage/SelectImage";
import { Specifications } from "./components/Specifications/Specifications";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { CommonDescription } from "./components/Descriptions/CommonDescription";
import settingImg from "../../../assets/images/testImage.png";
import Image from "next/image";
import arrow from "@/app/assets/icons/arrow-down-black-icon.svg";
import axios from "axios";
import { IComponentsResults } from "@/app/types";
import { OffersComponent } from "./components/OffersComponent/OffersComponent";

export default function ProductCard() {
  const params = usePathname();

  const digits = params?.split("/")[2];

  const [isShowDescription, setIsShowDescription] = useState(true);
  const [shortDescriptionData, setShortDescriptionData] = useState<any>({});
  const [data, setData] = useState<IComponentsResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [offersLimit, setOffersLimit] = useState(false);

  async function getProductData() {
    try {
      setIsLoading(true);
      setIsError(false);
      const respone = await axios.get(
        `https://techpoisk.com:8443/components/${digits}/`
      );
      const data = await respone.data;
      setData(data);
      return data;
    } catch (e) {
      setIsError(true);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }
  async function getShortDescrition() {
    try {
      const respone = await fetch(
        `https://techpoisk.com:8443/components/${digits}?hide_non_short_props=true`
      );
      const data = await respone.json();

      setShortDescriptionData(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getProductData();
    getShortDescrition();
  }, []);

  useEffect(() => {
    if (data) {
      document.title = `${data.name} - TechPoisk`;
    }
  }, [data]);

  return (
    <>
      {isLoading && <h2>Загрузка...</h2>}
      {isError && <h2>Возникла ошибка: {isError}</h2>}
      {!isLoading && (
        <>
          <div className="">
            <h1 className="text-[28px]">{data?.name}</h1>
            <div
              className={
                "flex justify-between gap-[20px] max-lg:flex-col items-center"
              }
            >
              {data?.pictures && <SelectImage pictures={data?.pictures} />}
              <div
                className={
                  "flex justify-between gap-[20px] max-lg:flex-col-reverse w-full self-start"
                }
              >
                {shortDescriptionData?.propertyCategories?.properties && (
                  <Specifications
                    property={
                      shortDescriptionData?.propertyCategories?.properties
                    }
                  />
                )}
                {data?.offers && data && (
                  <PriceBlock offers={data?.offers} data={data} />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[14px] lg:hidden mt-[15px]">
            <button
              onClick={() => {
                setIsShowDescription((prev) => !prev);
              }}
              className="w-full flex items-center justify-between gap-[5px] border-t-2 border-[#dde1e7] px-[5px] py-[10px] text-[16px]"
            >
              Все характеристики
              <Image
                src={arrow}
                alt="arrowDown"
                width={17}
                height={17}
                className={`${isShowDescription && "rotate-180"}`}
              />
            </button>
          </div>
          {isShowDescription && <CommonDescription data={data} />}

          <h2 className="mt-[50px] text-[28px] max-lg:hidden">
            Цены на {data?.name}
          </h2>
          <div className="w-full border-t-2 border-[#dde1e7] mt-[10px] mb-[20px] max-lg:hidden" />
          <div
            className={`flex items-center gap-[14px] lg:hidden mt-[15px] ${
              data?.offers && data?.offers?.length <= 2 && "hidden"
            }`}
          >
            <button
              onClick={() => {
                setOffersLimit((prev) => !prev);
              }}
              className={`border-t-2 justify-between w-full border-[#dde1e7] flex items-center gap-[5px] rounded-[5px] px-[5px] py-[10px] text-[16px] ${
                data?.offers && data?.offers?.length <= 1 && "hidden"
              }`}
            >
              Все магазины
              <Image
                src={arrow}
                alt="arrowDown"
                width={17}
                height={17}
                className={`${offersLimit && "rotate-180"}`}
              />
            </button>
          </div>
          {data && (
            <OffersComponent
              data={data}
              offersLimit={offersLimit}
              setOffersLimit={setOffersLimit}
            />
          )}
        </>
      )}
    </>
  );
}
