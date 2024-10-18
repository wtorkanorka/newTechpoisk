import React, { memo, useEffect, useState } from "react";
import { ProductRowComponent } from "../../productRowComponent/ProductRowComponent";
import axios from "axios";
import {
  useAdditionParamsForFilters,
  useComponentsStore,
  useFiltersName,
  useFiltersStore,
  useSearchTableName,
} from "@/app/hooks/hooks";
import { usePathname } from "next/navigation";
import { groupBy } from "lodash";
import { IComponentsGlobal, IComponentsResults } from "@/app/types";
import { Skeleton } from "../../skeleton/Skeleton";
import { SkeletSearchComponentsComponent } from "./SkeletSearchComponentsComponent";

interface IProductContainer {
  fetchStates: {
    isLoading: boolean;
    isError: boolean;
    data: IComponentsGlobal | null;
  };
}

export const ProductContainer = memo(({ fetchStates }: IProductContainer) => {
  const isLoading: boolean = fetchStates.isLoading;
  const isError: boolean = fetchStates.isError;
  const data: IComponentsGlobal | null = fetchStates.data;
  return (
    <div className="flex flex-col h-full overflow-y-auto overscroll-contain">
      {!isLoading &&
        !isError &&
        data?.results.map((component: IComponentsResults) => {
          return <ProductRowComponent data={component} key={component.id} />;
        })}
      {fetchStates.isError && (
        <p>Ошибка при получении либо компоненты не совместимы</p>
      )}
      {!isLoading && !isError && data?.results.length === 0 && (
        <p>Ничего не найдено, либо компоненты не совместимы</p>
      )}
      {isLoading && <SkeletSearchComponentsComponent />}
    </div>
  );
});
