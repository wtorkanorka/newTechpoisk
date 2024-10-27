"use client";

import Link from "next/link";
import React, { Dispatch, memo, SetStateAction } from "react";

interface ICatalogItemsArr {
  title: { ru: string; slug: string };
  titleParams: string;
  components: {
    firstColumn: {
      title: string;
      columnParams?: string;
      components: { name: string; params: string }[];
    };
    secondColumn?: {
      title: string;
      columnParams?: string;
      components: { name: string; params: string }[];
      innerColumn?: {
        title: string;
        columnParams?: string;
        components: { name: string; params: string }[];
      };
    };
  };
}
export const CatalogComponent = memo(
  ({
    setShowCatalog,
  }: {
    setShowCatalog?: Dispatch<SetStateAction<boolean>>;
  }) => {
    const catalogItemsArr: ICatalogItemsArr[] = [
      {
        title: { ru: "Процессор", slug: "processor" },
        titleParams: "/Catalog?componentType=processor",
        components: {
          firstColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "Intel Core i3", params: "" },
              { name: "Intel Core i5", params: "" },
              { name: "Intel Core i7", params: "" },
              { name: "Intel Core i9", params: "" },
              { name: "Intel Pentium", params: "" },
              { name: "Intel Xeon", params: "" },
            ],
          },
          secondColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "AMD Ryzen 3", params: "" },
              { name: "AMD Ryzen 5", params: "" },
              { name: "AMD Ryzen 7", params: "" },
              { name: "AMD Ryzen 9", params: "" },
              { name: "AMD Athlon", params: "" },
              { name: "AMD Threadripper", params: "" },
            ],
          },
        },
      },
      {
        title: { ru: "Материнская плата", slug: "motherboard" },
        titleParams: "/Catalog?componentType=motherboard",
        components: {
          firstColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "Intel H610", params: "" },
              { name: "Intel B660", params: "" },
              { name: "Intel B760", params: "" },
              { name: "Intel H670", params: "" },
              { name: "Intel H770", params: "" },
              { name: "Intel Z690", params: "" },
              { name: "Intel Z790", params: "" },
            ],
          },
          secondColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "AMD A320", params: "" },
              { name: "AMD A520", params: "" },
              { name: "AMD B450", params: "" },
              { name: "AMD B550", params: "" },
              { name: "AMD B650", params: "" },
              { name: "AMD X570", params: "" },
              { name: "AMD X670", params: "" },
            ],
          },
        },
      },
      {
        title: { ru: "Видеокарта", slug: "gpu" },
        titleParams: "/Catalog?componentType=gpu",
        components: {
          firstColumn: {
            title: "Nvidia",
            columnParams: "",
            components: [
              { name: "GeForce RTX 4000", params: "" },
              { name: "GeForce RTX 3000", params: "" },
              { name: "GeForce RTX 2000", params: "" },
              { name: "GeForce GTX 1600", params: "" },
              { name: "GeForce GT/GTX 1000", params: "" },
              { name: "GeForce GT 700", params: "" },
            ],
          },
          secondColumn: {
            title: "AMD",
            columnParams: "",
            components: [
              { name: "Radeon RX 7000", params: "" },
              { name: "Radeon RX 6000", params: "" },
              { name: "Radeon RX 500", params: "" },
            ],
            innerColumn: {
              title: "Intel",
              columnParams: "",
              components: [
                { name: "Arc A700", params: "" },
                { name: "Arc A300", params: "" },
              ],
            },
          },
        },
      },
      {
        title: { ru: "Оперативная память", slug: "ram" },
        titleParams: "/Catalog?componentType=ram",
        components: {
          firstColumn: {
            title: "DIMM",
            columnParams: "",
            components: [
              { name: "DDR5", params: "" },
              { name: "DDR4", params: "" },
              { name: "DDR3L", params: "" },
              { name: "DDR3", params: "" },
            ],
          },
          secondColumn: {
            title: "SO-DIMM",
            columnParams: "",
            components: [
              { name: "DDR5", params: "" },
              { name: "DDR4", params: "" },
              { name: "DDR3L", params: "" },
              { name: "DDR3", params: "" },
            ],
          },
        },
      },
      {
        title: { ru: "Охлаждение", slug: "cooler,liquid_cooling,case_fans" },
        titleParams: "/Catalog?componentType=cooler,liquid_cooling,case_fans",
        components: {
          firstColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "Охлаждение процессора", params: "" },
              { name: "Охлаждение SSD", params: "" },
              { name: "Корпусные вентиляторы", params: "" },
              { name: "Термопаста и термопрокладки", params: "" },
            ],
          },
        },
      },
      {
        title: { ru: "Блок питания", slug: "power_supply" },
        titleParams: "/Catalog?componentType=power_supply",
        components: {
          firstColumn: {
            title: "Мощность от",
            columnParams: "",
            components: [
              { name: "400 Вт", params: "" },
              { name: "600 Вт", params: "" },
              { name: "800 Вт", params: "" },
              { name: "1000 Вт", params: "" },
            ],
          },
          secondColumn: {
            title: "Сертификат",
            columnParams: "",
            components: [
              { name: "80 Plus Platinum", params: "" },
              { name: "80 Plus Gold", params: "" },
              { name: "80 Plus Bronze", params: "" },
              { name: "80 Plus", params: "" },
            ],
          },
        },
      },
      {
        title: { ru: "Копуса", slug: "case" },
        titleParams: "/Catalog?componentType=case",
        components: {
          firstColumn: {
            title: "Типоразмер",
            columnParams: "",
            components: [
              { name: "Full-Tower", params: "" },
              { name: "Mid-Tower", params: "" },
              { name: "Mini-Tower", params: "" },
              { name: "Slim", params: "" },
              { name: "SFF", params: "" },
            ],
          },
          secondColumn: {
            title: "Форм-фактор платы ",
            columnParams: "",
            components: [
              { name: "E-ATX", params: "" },
              { name: "ATX", params: "" },
              { name: "Micro-ATX", params: "" },
              { name: "Mini-ITX", params: "" },
            ],
          },
        },
      },
      {
        title: { ru: "Хранение данных", slug: "hdd,ssd" },
        titleParams: "/Catalog?componentType=hdd,ssd",
        components: {
          firstColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "SSD M2", params: "" },
              { name: "SSD mSATA", params: "" },
              { name: "SSD 2.5", params: "" },
            ],
          },
          secondColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "HDD 3.5″", params: "" },
              { name: "HDD 2.5″", params: "" },
            ],
          },
        },
      },
    ];
    //TODO сделать соединение логики для модалки и для страницы поиска, брать данные из ссылки, тип компонента уже там есть, везде использовать не searchTableName и тип из ссылки
    return (
      <div className="min-w-full max-w-[1212px] mx-[15px] h-full overflow-y-auto overscroll-contain grid grid-cols-4 gap-[20px] max-lg:gap-[10px] max-md:gap-[5px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-lg:min-h-[100%]">
        {catalogItemsArr.map((column, index) => {
          return (
            <div className="flex flex-col self-start " key={index}>
              <Link
                href={column.titleParams}
                className="text-[20px] font-[800] mb-[10px] text-left hover:text-[#0260e8]"
                onClick={() => setShowCatalog && setShowCatalog(false)}
              >
                {column.title.ru}
              </Link>
              <div className="flex gap-[40px] justify-between max-lg:justify-start max-sm:flex-wrap">
                {/* ПЕРВАЯ КОЛОНКА */}
                <div className="flex flex-col gap-[5px]">
                  {column.components.firstColumn.title &&
                    (column.title.slug === "gpu" ||
                    column.title.slug === "ram" ? (
                      <Link
                        href={"/"}
                        className="text-[17px] font-[800] mb-[2px] text-left whitespace-nowrap"
                        onClick={() => setShowCatalog && setShowCatalog(false)}
                      >
                        {column.components.firstColumn.title}
                      </Link>
                    ) : (
                      <h4 className="text-[17px] font-[800] mb-[2px] text-left whitespace-nowrap">
                        {column.components.firstColumn.title}
                      </h4>
                    ))}
                  {column.components.firstColumn.components.map(
                    (element, index) => {
                      return (
                        <Link
                          href="/"
                          className="text-left text-[14px] font-[300]"
                          key={index}
                          onClick={() =>
                            setShowCatalog && setShowCatalog(false)
                          }
                        >
                          {element.name}
                        </Link>
                      );
                    }
                  )}
                </div>
                {/* ВТОРАЯ КОЛОНКА */}
                <div className="flex flex-col gap-[5px]">
                  {column.components.secondColumn &&
                    column.components.secondColumn.title &&
                    (column.title.slug === "gpu" ||
                    column.title.slug === "ram" ? (
                      <Link
                        href={"/"}
                        className="text-[17px] font-[800] mb-[2px] text-left whitespace-nowrap"
                        onClick={() => setShowCatalog && setShowCatalog(false)}
                      >
                        {column.components.secondColumn.title}
                      </Link>
                    ) : (
                      <h4 className="text-[17px] font-[800] mb-[2px] text-left whitespace-nowrap">
                        {column.components.secondColumn.title}
                      </h4>
                    ))}
                  {column.components.secondColumn &&
                    column.components.secondColumn.components.map(
                      (element, index) => {
                        return (
                          <Link
                            href="/"
                            className="text-left text-[14px] font-[300] whitespace-nowrap"
                            key={index}
                            onClick={() =>
                              setShowCatalog && setShowCatalog(false)
                            }
                          >
                            {element.name}
                          </Link>
                        );
                      }
                    )}
                  {column.components.secondColumn?.innerColumn && (
                    <div>
                      <h4 className="text-[17px] font-[800] mb-[2px] text-left whitespace-nowrap">
                        {column.components.secondColumn?.innerColumn.title}
                      </h4>
                      <div className="flex flex-col">
                        {column.components.secondColumn?.innerColumn.components.map(
                          (element, index) => {
                            return (
                              <Link
                                href="/"
                                className="text-left text-[14px] font-[300] whitespace-nowrap"
                                key={index}
                                onClick={() =>
                                  setShowCatalog && setShowCatalog(false)
                                }
                              >
                                {element.name}
                              </Link>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
