"use client";
import Image from "next/image";
import { ConfiguratorRow } from "./components/configuratorRow/ConfiguratorRow";
import ModalPortal from "./components/modalPortal/ModalPortal";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  searchTableNameSlice,
  setNewSearchTableName,
} from "./redux/services/searchTableNameSlice";
import { useIsMobileWindow, useSearchTableName } from "./hooks/hooks";
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
  const { searchTableName, setSearchTableName } = useSearchTableName();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const configuratorArr: IconfiguratorArr[] = [
    {
      rowName: { ru: "Материнская плата", slug: "motherboard" },
      productCount: 0,
      howManyComponentsMustBe: "one",
      componentsArr: [],
      isComparison: null,
    },
    {
      rowName: { ru: "Процессор", slug: "cpu" },
      productCount: 1,
      howManyComponentsMustBe: "one",
      componentsArr: [],
      isComparison: null,
    },
    {
      rowName: { ru: "Видеокарта", slug: "gpu" },
      productCount: 2,
      howManyComponentsMustBe: "few",
      componentsArr: [],
      isComparison: null,
    },
    {
      rowName: { ru: "Оперативная память", slug: "ram" },
      productCount: 3,
      howManyComponentsMustBe: "few",
      componentsArr: [],
      isComparison: null,
    },
    {
      rowName: { ru: "Охлаждение", slug: "cooler,liquid_cooling,case_fans" },
      productCount: 4,
      howManyComponentsMustBe: "few",
      componentsArr: [],
      isComparison: null,
    },
    {
      rowName: { ru: "Копус", slug: "case" },
      productCount: 5,
      howManyComponentsMustBe: "one",
      componentsArr: [],
      isComparison: null,
    },
    {
      rowName: { ru: "Хранение данных", slug: "hdd,ssd" },
      productCount: 6,
      howManyComponentsMustBe: "few",
      componentsArr: [],
      isComparison: null,
    },
    {
      rowName: { ru: "Блок питания", slug: "power_supply" },
      productCount: 7,
      howManyComponentsMustBe: "one",
      componentsArr: [],
      isComparison: null,
    },
  ];
  const renderItems = useCallback(() => {
    return configuratorArr.map((e: IconfiguratorArr, index: number) => {
      return (
        <div
          key={index}
          onClick={(event) => {
            event.stopPropagation();
            setSearchTableName({
              ru: e.rowName.ru,
              slug: e.rowName.slug,
            });
            handleOpenModal();
          }}
        >
          <ConfiguratorRow key={index} {...e} />
        </div>
      );
    });
  }, []); //TODO: поставить в зависимость данные о элементах из store
  return (
    <>
      <h1 className="text-[32px] font-[400] mt-[50px]">Конфигуратор ПК</h1>
      <div className="w-full h-[1px] bg-[#dde1e7] mt-[15px] mb-[30px]" />
      <h2 className="text-[24px] font-[400] mb-[30px]">Системный блок</h2>
      <div className="flex gap-[10px] items-start justify-between max-lg:flex-col">
        <ul className="flex flex-col gap-[10px] w-full">{renderItems()}</ul>
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
