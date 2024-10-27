"use client";

import React, { Suspense } from "react";
import { SearchComponents } from "../components/searchComponents/SearchComponents";

export default function Catalog() {
  return (
    <Suspense fallback={<div>Загрузка ...</div>}>
      {" "}
      <SearchComponents />
    </Suspense>
  );
}
