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
              { name: "Intel Core i3", params: "&otherParams=series=Core i3" },
              { name: "Intel Core i5", params: "&otherParams=series=Core i5" },
              { name: "Intel Core i7", params: "&otherParams=series=Core i7" },
              { name: "Intel Core i9", params: "&otherParams=series=Core i9" },
              {
                name: "Intel Pentium",
                params: "&series=Pentium Dual-Core,Pentium Gold",
              },
              // { name: "Intel Xeon", params: "" }, //TODO спросить даню что для зеона писать
            ],
          },
          secondColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "AMD Ryzen 3", params: "&series=Ryzen 3, Ryzen 3 PRO" },
              {
                name: "AMD Ryzen 5",
                params: "&otherParams=series=AMD Ryzen 5, Ryzen 5 PRO",
              },
              {
                name: "AMD Ryzen 7",
                params: "&otherParams=series=AMD Ryzen 7, Ryzen 7 PRO",
              },
              { name: "AMD Ryzen 9", params: "&series=AMD Ryzen 9" },
              {
                name: "AMD Athlon",
                params:
                  "&otherParams=series=Athlon, Athlon X4, Athlon X2, Athlon PRO",
              },
              {
                name: "AMD Threadripper",
                params:
                  "&otherParams=series=Ryzen Threadripper, Ryzen Threadripper PRO",
              },
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
              { name: "Intel H610", params: "&otherParams=chipset=Intel H610" },
              // { name: "Intel B660", params: "&otherParams" },
              { name: "Intel B760", params: "&otherParams=chipset=Intel B760" },
              { name: "Intel H670", params: "&otherParams=chipset=Intel H670" },
              { name: "Intel H770", params: "&otherParams=chipset=Intel H770" },
              { name: "Intel Z690", params: "&otherParams=chipset=Intel Z690" },
              { name: "Intel Z790", params: "&otherParams=chipset=Intel Z790" },
            ],
          },
          secondColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "AMD A320", params: "&otherParams=chipset=AMD A320" },
              { name: "AMD A520", params: "&otherParams=chipset=AMD A520" },
              { name: "AMD B450", params: "&otherParams=chipset=AMD B450" },
              { name: "AMD B550", params: "&otherParams=chipset=AMD B550" },
              { name: "AMD B650", params: "&otherParams=chipset=AMD B650" },
              { name: "AMD X570", params: "&otherParams=chipset=AMD X570" },
              { name: "AMD X670", params: "&otherParams=chipset=AMD X670" },
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
            columnParams:
              "/Catalog?componentType=gpu&otherParams=gpu_manufacturer=NVIDIA",
            components: [
              {
                name: "GeForce RTX 4000",
                params: "&otherParams=generation=4000",
              },
              {
                name: "GeForce RTX 3000",
                params: "&otherParams=generation=3000",
              },
              {
                name: "GeForce RTX 2000",
                params: "&otherParams=generation=2000",
              },
              {
                name: "GeForce GTX 1600",
                params: "&otherParams=generation=1600",
              },
              {
                name: "GeForce GT/GTX 1000",
                params: "&otherParams=generation=1000",
              },
              { name: "GeForce GT 700", params: "&otherParams=generation=700" },
            ],
          },
          secondColumn: {
            title: "AMD",
            columnParams:
              "/Catalog?componentType=gpu&otherParams=gpu_manufacturer=AMD",
            components: [
              {
                name: "Radeon RX 7000",
                params: "&otherParams=generation=7000",
              },
              {
                name: "Radeon RX 6000",
                params: "&otherParams=generation=6000",
              },
              { name: "Radeon RX 500", params: "&otherParams=generation=500" },
            ],
            innerColumn: {
              title: "Intel",
              columnParams:
                "/Catalog?componentType=gpu&otherParams=gpu_manufacturer=Intel",
              components: [
                { name: "Arc A700", params: "&search=Arc A750,Arc A770" }, //TODO Спросить что писать тут
                { name: "Arc A300", params: "&search=Arc A310,Arc A380" }, //TODO Спросить что писать тут
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
            columnParams: "/Catalog?componentType=ram&form_factor=DIMM",
            components: [
              {
                name: "DDR5",
                params: "&otherParams=form_factor=DIMM&memory_type=DDR5",
              },
              {
                name: "DDR4",
                params: "&otherParams=form_factor=DIMM&memory_type=DDR4",
              },
              {
                name: "DDR3L",
                params: "&otherParams=form_factor=DIMM&memory_type=DDR3L",
              },
              {
                name: "DDR3",
                params: "&otherParams=form_factor=DIMM&memory_type=DDR3",
              },
            ],
          },
          secondColumn: {
            title: "SO-DIMM",
            columnParams: "/Catalog?componentType=ram&form_factor=SO-DIMM",
            components: [
              {
                name: "DDR5",
                params: "&otherParams=form_factor=SO-DIMM&memory_type=DDR5",
              },
              {
                name: "DDR4",
                params: "&otherParams=form_factor=SO-DIMM&memory_type=DDR4",
              },
              {
                name: "DDR3L",
                params: "&otherParams=form_factor=SO-DIMM&memory_type=DDR3L",
              },
              {
                name: "DDR3",
                params: "&otherParams=form_factor=SO-DIMM&memory_type=DDR3",
              },
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
              {
                name: "Охлаждение процессора",
                params: "&componentType=cooler",
              },
              // { name: "Охлаждение SSD", params: "" }, //TODO Что тут писать
              {
                name: "Корпусные вентиляторы",
                params: "&componentType=case_fans",
              },
              // { name: "Термопаста и термопрокладки", params: "" },
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
              { name: "400 Вт", params: "&otherParams=power_output=400 Вт" },
              { name: "600 Вт", params: "&otherParams=power_output=600 Вт" },
              { name: "800 Вт", params: "&otherParams=power_output=800 Вт" },
              { name: "1000 Вт", params: "&otherParams=power_output=1000 Вт" },
            ],
          },
          secondColumn: {
            title: "Сертификат",
            columnParams: "",
            components: [
              {
                name: "80 Plus Platinum",
                params: "&otherParams=80_plus_certification=Platinum",
              },
              {
                name: "80 Plus Gold",
                params: "&otherParams=80_plus_certification=Gold",
              },
              {
                name: "80 Plus Bronze",
                params: "&otherParams=80_plus_certification=Bronze",
              },
              {
                name: "80 Plus",
                params: "&otherParams=80_plus_certification=Standard,Certified",
              },
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
              {
                name: "Full-Tower",
                params: "&otherParams=form_factor=Full-Tower",
              },
              {
                name: "Mid-Tower",
                params: "&otherParams=form_factor=Mid-Tower",
              },
              {
                name: "Mini-Tower",
                params: "&otherParams=form_factor=Mini-Tower",
              },
              { name: "Slim", params: "&otherParams=form_factor=Slim" },
              { name: "SFF", params: "&otherParams=form_factor=SFF" },
            ],
          },
          secondColumn: {
            title: "Форм-фактор платы ",
            columnParams: "",
            components: [
              {
                name: "E-ATX",
                params: "&otherParams=compatible_motherboards=E-ATX",
              },
              {
                name: "ATX",
                params: "&otherParams=compatible_motherboards=ATX",
              },
              {
                name: "Micro-ATX",
                params: "&otherParams=compatible_motherboards=Micro-ATX",
              },
              {
                name: "Mini-ITX",
                params: "&otherParams=compatible_motherboards=Mini-ITX",
              },
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
              {
                name: "SSD M2",
                params: "&otherParams=interface=mSATA (mini SATA)",
              },
              { name: "SSD mSATA", params: "&otherParams=form_factor=M.2" },
              { name: "SSD 2.5", params: "&otherParams=form_factor=2.5" },
            ],
          },
          secondColumn: {
            title: "",
            columnParams: "",
            components: [
              { name: "HDD 3.5″", params: '&otherParams=form_factor=3.5"' },
              { name: "HDD 2.5″", params: '&otherParams=form_factor=2.5"' },
            ],
          },
        },
      },
    ];

    return (
      <div className="min-w-full max-w-[1212px] mx-[15px] h-full overflow-y-auto overscroll-contain grid grid-cols-4 gap-[20px] max-lg:gap-[10px] max-md:gap-[5px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-lg:min-h-[100%]">
        {catalogItemsArr.map((column, index) => {
          return (
            <div className="flex flex-col self-start " key={index}>
              <Link //НАЗВАНИЕ БЛОКА - Процессор, мат плата и тд
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
                      <Link //НАЗВАНИЕ ПЕРВОЙ КОЛОНКИ - nvidia, dimm, so-dim и тд
                        href={
                          column.components.firstColumn.columnParams
                            ? column.components.firstColumn.columnParams
                            : "#"
                        }
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
                          href={column.titleParams + element.params}
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
                      <Link //НАЗВАНИЕ ВТОРОЙ КОЛОНКИ - intel
                        href={
                          column.components.secondColumn.columnParams
                            ? column.components.secondColumn.columnParams
                            : "#"
                        }
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
                            href={column.titleParams + element.params}
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
                    <div className="flex flex-col items-start">
                      <Link //НАЗВАНИЕ ВНУТРЕННЕЙ КОЛОНКИ
                        href={
                          column.components.secondColumn.innerColumn
                            .columnParams
                            ? column.components.secondColumn.innerColumn
                                .columnParams
                            : "#"
                        }
                        onClick={() => setShowCatalog && setShowCatalog(false)}
                        className="text-[17px] font-[800] mb-[2px] text-left whitespace-nowrap w-full"
                      >
                        {column.components.secondColumn?.innerColumn.title}
                      </Link>
                      <div className="flex flex-col">
                        {column.components.secondColumn?.innerColumn.components.map(
                          (element, index) => {
                            return (
                              <Link
                                href={column.titleParams + element.params}
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
