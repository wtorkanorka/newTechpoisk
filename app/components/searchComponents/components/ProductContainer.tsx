import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProductRowComponent } from "../../productRowComponent/ProductRowComponent";

import { IComponentsGlobal, IComponentsResults } from "@/app/types";

import { SkeletSearchComponentsComponent } from "./SkeletSearchComponentsComponent";
import { useInView } from "react-intersection-observer";

interface IProductContainer {
  fetchStates: {
    isLoading: boolean;
    isError: boolean;
    dataState: IComponentsGlobal | null;
  };
  setPageState: Dispatch<SetStateAction<number>>;
}

export const ProductContainer = memo(
  ({ fetchStates, setPageState }: IProductContainer) => {
    const isLoading: boolean = fetchStates.isLoading;
    const isError: boolean = fetchStates.isError;
    const data: IComponentsGlobal | null = fetchStates.dataState;

    const { ref, inView, entry } = useInView({
      threshold: 0.5,
    });

    useEffect(() => {
      if (inView) {
        setPageState((prev) => prev + 1);
      }
    }, [inView]);
    return (
      <div className="flex flex-col h-full overflow-y-auto overscroll-contain">
        {!isError &&
          data?.results.map((component: IComponentsResults) => {
            return <ProductRowComponent data={component} key={component.id} />;
          })}
        {fetchStates.isError && (
          <p>Ошибка при получении либо компоненты не совместимы</p>
        )}
        {!isLoading && !isError && data?.results.length === 0 && (
          <p>Ничего не найдено, либо компоненты не совместимы</p>
        )}

        {!isLoading && !isError && fetchStates.dataState?.next && (
          <button
            className="min-h-[80px] w-full bg-[#0260e8] p-[10p] border-[#c4c4c4] text-[32px] text-[white] rounded-[50px] hover:opacity-50"
            ref={ref}
            onClick={() => setPageState((prev) => prev + 1)}
          >
            Загрузить дополнительно
          </button>
        )}
        {isLoading && <SkeletSearchComponentsComponent />}
      </div>
    );
  }
);
