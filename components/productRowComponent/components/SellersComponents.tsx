import React, { memo } from "react";
import { ProductManagerButton } from "../../productManagerButton/ProductManagerButton";
import {
  IComponentsResults,
  IComponentsResultsInStore,
  IOffers,
} from "@/app/types";
import { useComponentsStore, useSearchTableName } from "@/hooks/hooks";

export const SellersComponents = memo(
  ({ offers, data }: { offers: IOffers[]; data: IComponentsResults }) => {
    const { addComponent, selectedOfferIsInStore, removeComponent } =
      useComponentsStore();
    const { searchTableName } = useSearchTableName();

    return (
      <div className="grid grid-cols-3 py-[18px] border-b border-[#dde1e7] bg-[white] max-xl:grid-cols-2 max-lg:grid-cols-3 max-lg:w-full shadow-xl max-lg:mb-[61px]">
        {offers.map((offer) => {
          const isActive = selectedOfferIsInStore({
            searchTableName,
            data: {
              ...data,
              selectedOffer: offer,
              countOfComponents: 1,
            },
          });
          return (
            <div
              className={`p-1 max-lg:p-1 max-lg:flex max-lg:col-start-2 max-lg:items-center max-lg:w-full border-[#ff5252] rounded-[43px] ${
                isActive ? "hover:opacity-50" : ""
              }`}
              key={offer.id}
            >
              <ProductManagerButton
                isConfigurationButton={true}
                textContent={`${offer.store.name} - ${offer.price} ₽`}
                iconSize={17}
                title="Добавить в конфигуратор"
                onClickFunc={() => {
                  isActive
                    ? removeComponent({
                        searchTableName: searchTableName,
                        data: {
                          ...data,
                          selectedOffer: offer,
                          countOfComponents: 1,
                        },
                      })
                    : addComponent({
                        searchTableName: searchTableName,
                        data: data,
                        countOfComponents: 1,
                        offer: offer,
                      });
                }}
                isActive={isActive}
              />
            </div>
          );
        })}
      </div>
    );
  }
);
