import React, { memo } from "react";
import { ProductRowComponent } from "../../productRowComponent/ProductRowComponent";

export const ProductContainer = memo(() => {
  return (
    <div className="flex flex-col h-full overflow-y-auto overscroll-contain">
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
      <ProductRowComponent />
    </div>
  );
});
