import React from "react";
import { Skeleton } from "../../skeleton/Skeleton";
import { ProductManagerButton } from "../../productManagerButton/ProductManagerButton";

export const SkeletSearchComponentsComponent = () => {
  return (
    <div className="flex justify-between max-w-full gap-[30px] max-lg:gap-[20px] items-center py-[18px] max-xl:flex-wrap p-2 border-b border-[#DDE1E7]">
      <div className="flex items-center gap-[65px] max-lg:gap-[10px] max-lg:w-full">
        <Skeleton
          width="97px"
          height="120px"
          classes="max-lg:min-w-[70px] max-lg:max-w-[71px]"
        />
        <div className="flex flex-col gap-[6px] max-w-[466px] max-lg:flex-1">
          <Skeleton
            width="100%"
            height="30px"
            classes="min-w-[calc(30vw-50px)] max-lg:w-[100%] max-lg:min-w-[none]"
          />
          <Skeleton
            width="100%"
            height="46px"
            classes="min-w-[calc(30vw-50px)] max-lg:w-[100%] max-lg:min-w-[none]"
          />
        </div>
      </div>
      <div className="flex items-end gap-[27px] max-lg:w-full max-lg:justify-between max-ssm:flex-wrap">
        <div className="flex items-center flex-col gap-[16px]">
          <Skeleton width="168px" height="30px" />
          <Skeleton width="200px" height="38px" />
        </div>
        <div className="flex items-center gap-[20px] min-w-[80px] mb-[6px] max-lg:mb-[3px] max-lg:gap-[10px]">
          <Skeleton width="30px" height="30px" />
          <Skeleton width="30px" height="30px" />
        </div>
      </div>
    </div>
  );
};
