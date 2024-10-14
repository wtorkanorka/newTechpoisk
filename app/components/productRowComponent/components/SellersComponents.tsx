import React, { memo } from "react";
import { ProductManagerButton } from "../../productManagerButton/ProductManagerButton";

export const SellersComponents = memo(() => {
  return (
    <div className="grid grid-cols-3 py-[18px] border-b border-[#dde1e7] bg-[white] max-xl:grid-cols-2 max-lg:grid-cols-1 max-lg:w-full shadow-xl">
      <div className="p-1 max-lg:p-1 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:w-full">
        <ProductManagerButton
          isConfigurationButton={true}
          textContent={"Яндекс.Маркет - 10 000 ₽"}
          iconSize={17}
        />
      </div>
      <div className="p-1 max-lg:p-1 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:w-full">
        <ProductManagerButton
          isConfigurationButton={true}
          textContent={"Яндекс.Маркет - 10 000 ₽"}
          iconSize={17}
        />
      </div>
      <div className="p-1 max-lg:p-1 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:w-full">
        <ProductManagerButton
          isConfigurationButton={true}
          textContent={"Яндекс.Маркет - 10 000 ₽"}
          iconSize={17}
        />
      </div>
      <div className="p-1 max-lg:p-1 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:w-full">
        <ProductManagerButton
          isConfigurationButton={true}
          textContent={"Яндекс.Маркет - 10 000 ₽"}
          iconSize={17}
        />
      </div>
      <div className="p-1 max-lg:p-1 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:w-full">
        <ProductManagerButton
          isConfigurationButton={true}
          textContent={"Яндекс.Маркет - 10 000 ₽"}
          iconSize={17}
        />
      </div>
    </div>
  );
});
