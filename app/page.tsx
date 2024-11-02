"use client";
import Image from "next/image";
import { ConfiguratorRow } from "@/components/configuratorRow/ConfiguratorRow";
import ModalPortal from "@/components/modalPortal/ModalPortal";
import { useEffect, useState } from "react";

import {
  useComponentsStore,
  useSearchTableName,
  useWishlistStore,
} from "@/hooks/hooks";
import { SearchComponents } from "@/components/searchComponents/SearchComponents";
import { FeedbackComponent } from "@/components/feedbackComponent/FeedbackComponent";
import { BuyConfigurationComponent } from "@/components/buyConfigurationComponent/BuyConfigurationComponent";
import axios from "axios";
import { IComponentsResults, IComponentsResultsInStore } from "./types";
import { nanoid } from "@reduxjs/toolkit";
import startCircleIcon from "@/assets/icons/star_circle-icon.svg";
import userCircleIcon from "@/assets/icons/user_circle-icon.svg";
import Link from "next/link";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderItems, setRenderItems] = useState<boolean>(false);
  const [incompatibleIdsArr, setnIcompatibleIdsArr] = useState<{
    incompatible: number[];
  }>({ incompatible: [] });

  const { componentsStore, getAllIds, getPriceOfConfigurator } =
    useComponentsStore();
  const [addedToWishList, setAddedToWishList] = useState(false);
  const { addAssemblyToWishlist } = useWishlistStore();

  const [countOfComponents, setCountOfComponents] = useState<
    { componentType_Slug: string; count: number }[]
  >([
    {
      componentType_Slug: "gpu",
      count: 0,
    },
    {
      componentType_Slug: "ssd",
      count: 0,
    },
    {
      componentType_Slug: "case_fans",
      count: 0,
    },
    {
      componentType_Slug: "processor",
      count: 0,
    },
    {
      componentType_Slug: "hdd",
      count: 0,
    },
    {
      componentType_Slug: "motherboard",
      count: 0,
    },
    {
      componentType_Slug: "case",
      count: 0,
    },
    {
      componentType_Slug: "liquid_cooling",
      count: 0,
    },
    {
      componentType_Slug: "power_supply",
      count: 0,
    },
    {
      componentType_Slug: "ram",
      count: 0,
    },
    {
      componentType_Slug: "cooler",
      count: 0,
    },
  ]);
  const { searchTableName, setSearchTableName } = useSearchTableName();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function checkCompatibleIds(ids: string) {
    try {
      const response = await axios.get(
        `https://techpoisk.com:8443/checkCompatibility/?ids=${ids}`
      );
      const data = response.data;

      setnIcompatibleIdsArr(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getCountOfComponentsInConfigurator() {
    try {
      const response = await axios.get(
        "https://techpoisk.com:8443/componentTypeCount"
      );
      const data = response.data;
      setCountOfComponents(data);
      setRenderItems(true);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getCountOfComponentsInConfigurator();
    const ids = getAllIds().join(",");
    if (Boolean(ids)) {
      checkCompatibleIds(ids);
    }
  }, [componentsStore]);

  const isIncompatible = (components: IComponentsResults[]) =>
    components?.length !== 0 || incompatibleIdsArr.incompatible.length == 0
      ? components?.some((component) =>
          incompatibleIdsArr.incompatible.flat().includes(component.id)
        ) ?? null
      : null;

  const incompatibleData: { [key: string]: boolean | null } = {
    motherboard:
      componentsStore["motherboard"].length !== 0
        ? !isIncompatible(componentsStore["motherboard"])
        : null,
    processor:
      componentsStore["processor"].length !== 0
        ? !isIncompatible(componentsStore["processor"])
        : null,
    ram:
      componentsStore["ram"].length !== 0
        ? !isIncompatible(componentsStore["ram"])
        : null,
    "hdd,ssd":
      componentsStore["hdd,ssd"].length !== 0
        ? !isIncompatible(componentsStore["hdd,ssd"])
        : null,
    gpu:
      componentsStore["gpu"].length !== 0
        ? !isIncompatible(componentsStore["gpu"])
        : null,
    power_supply:
      componentsStore["power_supply"].length !== 0
        ? !isIncompatible(componentsStore["power_supply"])
        : null,
    case:
      componentsStore["case"].length !== 0
        ? !isIncompatible(componentsStore["case"])
        : null,
    "cooler,liquid_cooling,case_fans":
      componentsStore["cooler,liquid_cooling,case_fans"].length !== 0
        ? !isIncompatible(componentsStore["cooler,liquid_cooling,case_fans"])
        : null,
  };
  useEffect(() => setAddedToWishList(false), [componentsStore]);
  return (
    <>
      <h1 className="text-[32px] font-[400] mt-[50px]">Конфигуратор ПК</h1>
      <div className="w-full h-[1px] bg-[#dde1e7] mt-[15px] mb-[30px] max-lg:hidden" />
      <div className="grid grid-cols-2 my-[18px] max-ssm:grid-cols-1 gap-[11px] lg:hidden">
        <Link
          href="/pages/pcbuilding"
          className="rounded-[8px] bg-[#ffdce0] flex justify-between items-center p-[6px] w-full"
        >
          <p className="text-[14px] font-[400]">Гид по сборке</p>
          <Image src={startCircleIcon} width={38} height={38} alt="icon" />
        </Link>
        <Link
          href="/configurations"
          className="rounded-[8px] bg-[#e2eeff] flex justify-between items-center p-[6px] w-full"
        >
          <p className="text-[14px] font-[400]">Сборки пользователей</p>
          <Image src={userCircleIcon} width={38} height={38} alt="icon" />
        </Link>
      </div>
      <div className="flex gap-[10px] max-lg:justify-between max-lg:items-center">
        <h2 className="text-[24px] font-[400] mb-[30px]">Системный блок</h2>

        <button
          onClick={() => {
            if (!addedToWishList) {
              addAssemblyToWishlist({
                component: componentsStore,
                price: getPriceOfConfigurator(),
                name: "Сборка",
                id: nanoid(),
                isAssembly: true,
              });
              setAddedToWishList(true);
            }
          }}
          className={`flex justify-between items-center gap-[5px] lg:hidden`}
        >
          <div
            className={`rounded-[34px] flex items-center justify-between ${
              addedToWishList ? "bg-[#FF5252]" : "bg-[#dde1e7]"
            } min-w-[30px] min-h-[30px] p-[6px] hover:opacity-50`}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2944 4.13663C14.5149 3.35733 13.4817 2.88169 12.3814 2.79563C11.281 2.70957 10.1861 3.01876 9.29438 3.66735C8.35883 2.97342 7.19437 2.65876 6.0355 2.78673C4.87662 2.91471 3.80941 3.4758 3.04877 4.35704C2.28813 5.23827 1.89057 6.37418 1.93614 7.53602C1.98172 8.69786 2.46704 9.79934 3.29438 10.6186L7.86055 15.1795C8.24292 15.5548 8.7579 15.7651 9.29438 15.7651C9.83086 15.7651 10.3458 15.5548 10.7282 15.1795L15.2944 10.6186C16.1529 9.75724 16.6348 8.5921 16.6348 7.37763C16.6348 6.16315 16.1529 4.99801 15.2944 4.13663ZM14.2576 9.60673L9.69144 14.1603C9.63948 14.2126 9.57763 14.2541 9.50948 14.2825C9.44133 14.3108 9.36822 14.3254 9.29438 14.3254C9.22054 14.3254 9.14743 14.3108 9.07927 14.2825C9.01112 14.2541 8.94928 14.2126 8.89732 14.1603L4.33114 9.58473C3.75449 8.99691 3.43159 8.20728 3.43159 7.38496C3.43159 6.56264 3.75449 5.77301 4.33114 5.18519C4.91876 4.60664 5.71127 4.28223 6.53702 4.28223C7.36278 4.28223 8.15529 4.60664 8.74291 5.18519C8.81126 5.25392 8.89259 5.30847 8.98219 5.34569C9.07179 5.38292 9.1679 5.40209 9.26497 5.40209C9.36203 5.40209 9.45814 5.38292 9.54774 5.34569C9.63735 5.30847 9.71867 5.25392 9.78702 5.18519C10.3746 4.60664 11.1672 4.28223 11.9929 4.28223C12.8187 4.28223 13.6112 4.60664 14.1988 5.18519C14.7834 5.76531 15.1169 6.55065 15.1279 7.373C15.1389 8.19534 14.8265 8.98928 14.2576 9.58473V9.60673Z"
                fill={addedToWishList ? "white" : "black"}
              />
            </svg>
          </div>
        </button>
      </div>
      <div className="flex gap-[10px] items-start justify-between max-lg:flex-col">
        {!renderItems && (
          <div className="flex flex-col gap-[10px] w-full">
            <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] w-full min-h-[94px]" />
            <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] w-full min-h-[94px]" />
            <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] w-full min-h-[94px]" />
            <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] w-full min-h-[94px]" />
            <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] w-full min-h-[94px]" />
            <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] w-full min-h-[94px]" />
            <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] w-full min-h-[94px]" />
            <div className="border-[1px] rounded-[20px] border-[#dde1e7] py-[31px] px-[35px] w-full min-h-[94px]" />
          </div>
        )}
        {renderItems && (
          <ul className="flex flex-col gap-[10px] w-full">
            <div
              onClick={(event) => {
                event.stopPropagation();
                setSearchTableName({
                  ru: "Материнская плата",
                  slug: "motherboard",
                });
                handleOpenModal();
              }}
            >
              <ConfiguratorRow
                productCount={
                  countOfComponents.find(
                    (item) => item.componentType_Slug === "motherboard"
                  )?.count || 0
                }
                howManyComponentsMustBe="one"
                componentsArr={[...componentsStore["motherboard"]]}
                isComparison={incompatibleData.motherboard}
                rowName={{ ru: "Материнская плата", slug: "motherboard" }}
              />
            </div>
            <div
              onClick={(event) => {
                event.stopPropagation();
                setSearchTableName({
                  ru: "Процессор",
                  slug: "processor",
                });
                handleOpenModal();
              }}
            >
              <ConfiguratorRow
                productCount={
                  countOfComponents.find(
                    (item) => item.componentType_Slug === "processor"
                  )?.count || 0
                }
                howManyComponentsMustBe="one"
                componentsArr={[...componentsStore["processor"]]}
                isComparison={incompatibleData.processor}
                rowName={{ ru: "Процессор", slug: "processor" }}
              />
            </div>
            <div
              onClick={(event) => {
                event.stopPropagation();
                setSearchTableName({
                  ru: "Видеокарта",
                  slug: "gpu",
                });
                handleOpenModal();
              }}
            >
              <ConfiguratorRow
                productCount={
                  countOfComponents.find(
                    (item) => item.componentType_Slug === "gpu"
                  )?.count || 0
                }
                howManyComponentsMustBe="few"
                componentsArr={[...componentsStore["gpu"]]}
                isComparison={incompatibleData.gpu}
                rowName={{ ru: "Видеокарта", slug: "gpu" }}
              />
            </div>
            <div
              onClick={(event) => {
                event.stopPropagation();
                setSearchTableName({
                  ru: "Оперативная память",
                  slug: "ram",
                });
                handleOpenModal();
              }}
            >
              <ConfiguratorRow
                productCount={
                  countOfComponents.find(
                    (item) => item.componentType_Slug === "ram"
                  )?.count || 0
                }
                howManyComponentsMustBe="few"
                componentsArr={[...componentsStore["ram"]]}
                isComparison={incompatibleData.ram}
                rowName={{ ru: "Оперативная память", slug: "ram" }}
              />
            </div>
            <div
              onClick={(event) => {
                event.stopPropagation();
                setSearchTableName({
                  ru: "Охлаждение",
                  slug: "cooler,liquid_cooling,case_fans",
                });
                handleOpenModal();
              }}
            >
              <ConfiguratorRow
                productCount={
                  (countOfComponents.find(
                    (item) => item.componentType_Slug === "cooler"
                  )?.count || 0) +
                    (countOfComponents.find(
                      (item) => item.componentType_Slug === "liquid_cooling"
                    )?.count || 0) +
                    (countOfComponents.find(
                      (item) => item.componentType_Slug === "case_fans"
                    )?.count || 0) || 0
                }
                howManyComponentsMustBe="few"
                componentsArr={[
                  ...componentsStore["cooler,liquid_cooling,case_fans"],
                ]}
                isComparison={
                  incompatibleData["cooler,liquid_cooling,case_fans"]
                }
                rowName={{
                  ru: "Охлаждение",
                  slug: "cooler,liquid_cooling,case_fans",
                }}
              />
            </div>
            <div
              onClick={(event) => {
                event.stopPropagation();
                setSearchTableName({
                  ru: "Копус",
                  slug: "case",
                });
                handleOpenModal();
              }}
            >
              <ConfiguratorRow
                productCount={
                  countOfComponents.find(
                    (item) => item.componentType_Slug === "case"
                  )?.count || 0
                }
                howManyComponentsMustBe="one"
                componentsArr={[...componentsStore["case"]]}
                isComparison={incompatibleData.case}
                rowName={{ ru: "Копус", slug: "case" }}
              />
            </div>
            <div
              onClick={(event) => {
                event.stopPropagation();
                setSearchTableName({
                  ru: "Хранение данных",
                  slug: "hdd,ssd",
                });
                handleOpenModal();
              }}
            >
              <ConfiguratorRow
                productCount={
                  (countOfComponents.find(
                    (item) => item.componentType_Slug === "hdd"
                  )?.count || 0) +
                    (countOfComponents.find(
                      (item) => item.componentType_Slug === "ssd"
                    )?.count || 0) || 0
                }
                howManyComponentsMustBe="few"
                componentsArr={[...componentsStore["hdd,ssd"]]}
                isComparison={incompatibleData["hdd,ssd"]}
                rowName={{ ru: "Хранение данных", slug: "hdd,ssd" }}
              />
            </div>
            <div
              onClick={(event) => {
                event.stopPropagation();
                setSearchTableName({
                  ru: "Блок питания",
                  slug: "power_supply",
                });
                handleOpenModal();
              }}
            >
              <ConfiguratorRow
                productCount={
                  countOfComponents.find(
                    (item) => item.componentType_Slug === "power_supply"
                  )?.count || 0
                }
                howManyComponentsMustBe="one"
                componentsArr={[...componentsStore["power_supply"]]}
                isComparison={incompatibleData["power_supply"]}
                rowName={{ ru: "Блок питания", slug: "power_supply" }}
              />
            </div>
          </ul>
        )}
        <div className="max-lg:w-full">
          <BuyConfigurationComponent />
          <FeedbackComponent />
        </div>
      </div>
      <ModalPortal isOpen={isModalOpen} onClose={handleCloseModal}>
        <SearchComponents onClose={handleCloseModal} />
      </ModalPortal>
    </>
  );
}
