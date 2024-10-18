import React, { memo } from "react";

interface RectangleProps {
  width?: string;
  height?: string;
  classes?: string;
}
export const Skeleton = memo(
  ({ width = "", height = "", classes }: RectangleProps) => {
    return (
      <div
        className={`animate-pulse bg-[#8b8b8b] rounded-[43px] ${
          classes && classes
        }`}
        style={{
          width: width,
          height: height,
        }}
      />
    );
  }
);
