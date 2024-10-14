import React, { memo } from "react";

interface RectangleProps {
  width?: number;
  height: number;
  isFull?: boolean;
}
export const Skeleton = memo(
  ({ width = 10, height = 10, isFull = false }: RectangleProps) => {
    return (
      <div
        className={`animate-pulse bg-[#8b8b8b] rounded-[43px]`}
        style={{
          width: isFull ? "100%" : `${width}px`,
          height: `${height}px`,
        }}
      />
    );
  }
);
