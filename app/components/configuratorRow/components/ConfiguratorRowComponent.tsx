"use client";

import { IComponentsResultsInStore, IOffers } from "@/app/types";
import Image from "next/image";
import React, { memo } from "react";
import settingImg from "@/app/assets/icons/settingImg.svg";
import Link from "next/link";
import changeArrowsIcon from "@/app/assets/icons/change-arrows.svg";
import crossIcon from "@/app/assets/icons/cross-icon-black.svg";
import plusIcon from "@/app/assets/icons/plus-icon-black.svg";
import { namesSearchTableName, useComponentsStore } from "@/app/hooks/hooks";
import { CountOfComponentsChangerComponent } from "./CountOfComponentsChangerComponent";
export const ConfiguratorRowComponent = memo(
  ({
    component,
    howManyComponentsMustBe,
    rowName,
  }: {
    component: IComponentsResultsInStore;
    howManyComponentsMustBe: "one" | "few";
    rowName: { ru: string; slug: namesSearchTableName };
  }) => {
    const hasImage: boolean = Boolean(
      component.pictures && component.pictures[0] && component.pictures[0].url
    );
    const { componentsStore, removeComponent } = useComponentsStore();
    return (
      <div className="py-[9px] grid grid-cols-[2fr_0.5fr_0.5fr]">
        <Link
          href={`/ProductCard/${component.id}`}
          className="flex items-start gap-[28px] max-lg:items-center max-lg:gap-[13px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Image
            src={hasImage ? component.pictures[0].url : settingImg}
            width={hasImage ? component.pictures[0].width : "72"}
            height={hasImage ? component.pictures[0].height : "65"}
            alt={hasImage ? "component.pictures[0].url" : "settingImg"}
            className="min-w-[70px] max-w-[72px] max-lg:min-w-[30px] max-lg:w-[30px] self-center"
          />
          <div className="self-center">
            <h3 className="text-[20px] font-[400] leading-[20px] max-lg:text-[10px] max-lg:leading-3">
              {component.name}
            </h3>
            <p className="text-left text-[14px] font-[300] text-[#9e9e9e] max-lg:text-[12px] max-lg:hidden">
              {component?.propertyCategories.properties
                ?.map((prop: any) => prop.value)
                .join(", ")}
            </p>
          </div>
        </Link>
        <div className="flex flex-col gap-[5px] items-center justify-center">
          <h4 className="text-[20px] fron-[600] max-lg:text-[10px]">
            {component.selectedOffer.price * component.countOfComponents} ₽
          </h4>
          <p className="text-center text-[20px] font-[300] text-[#9e9e9e] max-lg:text-[12px]">
            {component.selectedOffer.store.name}
          </p>
        </div>
        <div className="self-center flex flex-col gap-[5px]">
          <div className="flex gap-[5px] justify-end">
            {howManyComponentsMustBe === "one" && (
              <button className="hover:opacity-50" title="Заменить">
                <Image
                  src={changeArrowsIcon}
                  width={24}
                  height={24}
                  alt="changeArrowsIcon"
                  className="min-w-[24px] max-lg:min-w-[17px]"
                />
              </button>
            )}
            {howManyComponentsMustBe === "few" && (
              <button className="hover:opacity-50" title="Добавить">
                <Image
                  src={plusIcon}
                  width={24}
                  height={24}
                  alt="plus"
                  className="min-w-[24px] max-lg:min-w-[17px]"
                />
              </button>
            )}
            <button
              className="hover:opacity-50"
              title="Убрать из конфигуратора"
              onClick={(e) => {
                e.stopPropagation();
                removeComponent({
                  searchTableName: rowName,
                  data: component,
                });
              }}
            >
              <Image
                src={crossIcon}
                width={24}
                height={24}
                alt="crossIcon"
                className="min-w-[24px] max-lg:min-w-[17px]"
              />
            </button>
          </div>
          {howManyComponentsMustBe !== "one" && (
            <div className="self-end">
              <CountOfComponentsChangerComponent
                data={{
                  selectedOfferId: component.selectedOffer.id,
                  searchTableName: rowName,
                  count: component.countOfComponents,
                }}
                currentState={component.countOfComponents}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);
