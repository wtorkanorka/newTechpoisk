"use client";

import { useSearchTableName } from "@/app/hooks/hooks";
import React, { useState } from "react";
import closeIconGray from "@/app/assets/icons/close-icon-gray.svg";
import Image from "next/image";
import { SearchComponentsHeader } from "./components/SearchComponentsHeader";
import { FilterPanel } from "../filterPanel/FilterPanel";
import { MainSearchComponentsComponent } from "./components/MainSearchComponentsComponent";
import { SearchComponentsInput } from "./components/SearchComponentsInput";
import { SearchComponentsFiltersLeftPart } from "./components/SearchComponentsFiltersLeftPart";

interface ISearchComponents {
  onClose?: () => void;
}
export function SearchComponents<T extends ISearchComponents>({
  onClose,
}: T): React.ReactNode {
  const { searchTableName } = useSearchTableName();
  const [expandFilter, setExpandFilter] = useState(false);
  return (
    <div className="flex flex-col max-h-full h-full max-w-full justify-center">
      <SearchComponentsHeader
        onClose={onClose}
        headerName={searchTableName}
        setExpandFilter={setExpandFilter}
      />

      <div className="flex justify-between items-center gap-[40px] max-lg:gap-[10px] h-full  pt-[23px] max-h-[calc(100%-18px-23px-16px-10px)]">
        <SearchComponentsFiltersLeftPart
          expandFilter={expandFilter}
          setExpandFilter={setExpandFilter}
        />
        <MainSearchComponentsComponent />
      </div>
    </div>
  );
}
