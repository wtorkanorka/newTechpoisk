"use client";
import Image from "next/image";
import { ConfiguratorRow } from "./components/configuratorRow/ConfiguratorRow";
import ModalPortal from "./components/modalPortal/ModalPortal";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  searchTableNameSlice,
  setNewSearchTableName,
} from "./redux/services/searchTableNameSlice";
import {
  namesSearchTableName,
  useComponentsStore,
  useIsMobileWindow,
  useSearchTableName,
} from "./hooks/hooks";
import { SearchComponents } from "./components/searchComponents/SearchComponents";
import { FeedbackComponent } from "./components/feedbackComponent/FeedbackComponent";
import { BuyConfigurationComponent } from "./components/buyConfigurationComponent/BuyConfigurationComponent";
import axios from "axios";
import { IComponentsResults, IComponentsResultsInStore } from "./types";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderItems, setRenderItems] = useState<boolean>(false);
  const [incompatibleIdsArr, setnIcompatibleIdsArr] = useState<{
    incompatible: number[];
  }>({ incompatible: [] });

  const { getAllIds } = useComponentsStore();

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
  const { componentsStore } = useComponentsStore();

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

  return (
    <>
      <h1 className="text-[32px] font-[400] mt-[50px]">Конфигуратор ПК</h1>
      <div className="w-full h-[1px] bg-[#dde1e7] mt-[15px] mb-[30px]" />
      <div className="flex gap-[10px] max-lg:justify-between max-lg:items-center">
        <h2 className="text-[24px] font-[400] mb-[30px]">Системный блок</h2>
        <button className="lg:hidden flex items-center text-center">
          Сюда кнопку добавить
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
