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
  useComponentsStore,
  useIsMobileWindow,
  useSearchTableName,
} from "./hooks/hooks";
import { SearchComponents } from "./components/searchComponents/SearchComponents";
import { FeedbackComponent } from "./components/feedbackComponent/FeedbackComponent";
import { BuyConfigurationComponent } from "./components/buyConfigurationComponent/BuyConfigurationComponent";

interface IconfiguratorArr {
  rowName: { ru: string; slug: string };
  productCount: number;
  howManyComponentsMustBe: string;
  componentsArr: any[];
  isComparison: null | boolean;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderItems, setRenderItems] = useState<boolean>(false);
  const { searchTableName, setSearchTableName } = useSearchTableName();
  const { componentsStore } = useComponentsStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const items = useCallback(() => {
  //   return configuratorArr.map((e: IconfiguratorArr, index: number) => {
  //     return (
  //       <div
  //         key={index}
  //         onClick={(event) => {
  //           event.stopPropagation();
  //           setSearchTableName({
  //             ru: e.rowName.ru,
  //             slug: e.rowName.slug,
  //           });
  //           handleOpenModal();
  //         }}
  //       >
  //         <ConfiguratorRow key={index} {...e} />
  //       </div>
  //     );
  //   });
  // }, [renderItems, componentsStore]);
  useEffect(() => {
    // Это нужно для того, чтобы небыло ошибки при гидратации, тут по сути я при начальном рендере выставляю true для того чтобы отрисовать элементы, иначе я не знаю как починить ssr
    setRenderItems(true);
  }, [componentsStore]);
  return (
    <>
      <h1 className="text-[32px] font-[400] mt-[50px]">Конфигуратор ПК</h1>
      <div className="w-full h-[1px] bg-[#dde1e7] mt-[15px] mb-[30px]" />
      <h2 className="text-[24px] font-[400] mb-[30px]">Системный блок</h2>
      <div className="flex gap-[10px] items-start justify-between max-lg:flex-col">
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
                productCount={0}
                howManyComponentsMustBe="one"
                componentsArr={[...componentsStore["motherboard"]]}
                isComparison={null}
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
                productCount={1}
                howManyComponentsMustBe="one"
                componentsArr={[...componentsStore["processor"]]}
                isComparison={null}
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
                productCount={2}
                howManyComponentsMustBe="few"
                componentsArr={[...componentsStore["gpu"]]}
                isComparison={null}
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
                productCount={3}
                howManyComponentsMustBe="few"
                componentsArr={[...componentsStore["ram"]]}
                isComparison={null}
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
                productCount={4}
                howManyComponentsMustBe="few"
                componentsArr={[
                  ...componentsStore["cooler,liquid_cooling,case_fans"],
                ]}
                isComparison={null}
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
                productCount={5}
                howManyComponentsMustBe="one"
                componentsArr={[...componentsStore["case"]]}
                isComparison={null}
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
                productCount={6}
                howManyComponentsMustBe="few"
                componentsArr={[...componentsStore["hdd,ssd"]]}
                isComparison={null}
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
                productCount={7}
                howManyComponentsMustBe="one"
                componentsArr={[...componentsStore["power_supply"]]}
                isComparison={null}
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
