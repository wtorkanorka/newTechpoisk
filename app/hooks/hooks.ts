import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setNewFilter } from "../redux/services/searchComponentsFiltersSlice";
import { setNewSearchTableName } from "../redux/services/searchTableNameSlice";
import { RootState } from "../redux/store";
import { IFilters, ISelectFilterComponent } from "../types";
import { toggleSelectedFilter } from "../redux/services/additionParamsForFiltersSlice";
import {
  addFilterToStore,
  removeFilter,
  resetFilters,
} from "../redux/services/filtersStoreSlice";
import axios from "axios";

export type namesSearchTableName =
  | "motherboard"
  | "processor"
  | "ram"
  | "hdd,ssd"
  | "gpu"
  | "power_supply"
  | "case"
  | "cooler,liquid_cooling,case_fans";
export const useSearchTableName = () => {
  const searchTableName = useAppSelector(
    (state: RootState) => state.searchTableNameReducer.searchTableName
  ) || { ru: "Процессор", slug: "processor" };
  const dispatch = useAppDispatch();

  const setSearchTableName = (newSearchTableName: {
    ru: string;
    slug: string;
  }) => {
    dispatch(setNewSearchTableName({ searchTableName: newSearchTableName }));
  };

  return { searchTableName, setSearchTableName };
};
export const useFiltersName = (componentName: string) => {
  //componentName указывается для того чтобы перезаписывать имя фильтра только для конкретной страницы
  const filter = useAppSelector(
    (state) => state.searchComponentsFiltersReducer
  );
  const dispatch = useAppDispatch();

  const setFilter = ({
    newFiltersName,
    newFiltersType,
  }: {
    newFiltersName: string;
    newFiltersType: string;
  }) => {
    dispatch(
      setNewFilter({
        //Указать название контейнера и новые данные
        componentName,
        name: newFiltersName,
        type: newFiltersType,
      })
    );
  };

  return { filter, setFilter };
};

export const useIsMobileWindow = () => {
  const [isMobileWindow, setIsMobileWindow] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobileWindow(screenWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Run once on mount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { isMobileWindow, setIsMobileWindow };
};

type FilterState = {
  [K in "cooler" | "liquid_cooling" | "case_fans" | "hdd" | "ssd"]: boolean;
};
export const useAdditionParamsForFilters = (): {
  filtersState: FilterState;
  toggleFilter: (
    name: "cooler" | "liquid_cooling" | "case_fans" | "hdd" | "ssd"
  ) => void;
} => {
  const filtersState = useAppSelector(
    (state) => state.additionParamsForFiltersReducer
  ) as FilterState;
  const dispatch = useAppDispatch();
  const toggleFilter = (
    name: "cooler" | "liquid_cooling" | "case_fans" | "hdd" | "ssd"
  ) => {
    dispatch(toggleSelectedFilter({ filterName: name }));
  };

  return { filtersState, toggleFilter };
};

export const useFiltersStore = () => {
  const filtersStore = useAppSelector((state) => state.filtersStoreReducer);
  const dispatch = useAppDispatch();

  const addFilter = ({
    containerName,
    searchTableName,
    filterName,
  }: {
    containerName: string;
    searchTableName: namesSearchTableName;
    filterName: string;
  }) => {
    return dispatch(
      addFilterToStore({ searchTableName, containerName, filterName })
    );
  };
  const deleteFilterFromStore = ({
    searchTableName,
    containerName,
    filterName,
  }: {
    containerName: string;
    searchTableName: namesSearchTableName;
    filterName: string;
  }) => {
    dispatch(removeFilter({ searchTableName, containerName, filterName }));
  };
  const clearAllFilters = ({
    searchTableName,
  }: {
    searchTableName: { ru: string; slug: namesSearchTableName };
  }) => {
    return dispatch(resetFilters({ searchTableName }));
  };

  return { filtersStore, addFilter, deleteFilterFromStore, clearAllFilters };
};
const getFiltersId = ({
  searchTableName,
}: {
  searchTableName: { ru: string; slug: namesSearchTableName };
}) => {
  const ids: { [key: string]: number | number[] } = {
    motherboard: 1,
    cpu: 2,
    ram: 3,
    "hdd,ssd": [4, 5],
    gpu: 6,
    power_supply: 7,
    case: 8,
    "cooler,liquid_cooling,case_fans": [9, 10, 11],
    case_fans: [9, 10, 11],
  };

  return ids[searchTableName.slug];
};
export const useFetchFilters = ({
  searchTableName,
}: {
  searchTableName: { ru: string; slug: namesSearchTableName };
}): {
  isLoading: boolean;
  error: boolean;
  data: any;
  refetch: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IFilters | null>(null);
  const [error, setError] = useState<boolean>(false);
  const fetchFilters = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        `https://techpoisk.com:8443/componentTypes/${getFiltersId({
          searchTableName,
        })}/?hideNonFilterProps=true&showValues=always&showCount=true`
      );
      setData(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      setError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchFilters();
  }, [searchTableName.slug]);
  const refetch = async () => {
    fetchFilters();
  };
  return { isLoading, error, data, refetch };
};
