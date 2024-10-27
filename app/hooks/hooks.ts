import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setNewFilter } from "../redux/services/searchComponentsFiltersSlice";
import { setNewSearchTableName } from "../redux/services/searchTableNameSlice";
import { RootState } from "../redux/store";
import {
  IComponentsResults,
  IComponentsResultsInStore,
  IFilters,
  IOffers,
  IPropertyCategories,
  ISelectFilterComponent,
} from "../types";
import { toggleSelectedFilter } from "../redux/services/additionalParamsForFiltersSlice";
import {
  addFilterToStore,
  removeFilter,
  resetFilters,
} from "../redux/services/filtersStoreSlice";
import axios from "axios";
import {
  addComponentToStore,
  changeCountOfComponents,
  removeComponentFromStore,
} from "../redux/services/componentsStoreSlice";
import {
  addAssemblyWishlist,
  addComponentWishlist,
  deleteComponentFromWishlist,
  editNameOfAssemblyWishlist,
  IWishList,
} from "../redux/services/wishlistSlice";
import { usePathname, useSearchParams } from "next/navigation";

export type namesSearchTableName =
  | "motherboard"
  | "processor"
  | "ram"
  | "hdd,ssd"
  | "gpu"
  | "power_supply"
  | "case"
  | "cooler,liquid_cooling,case_fans";

const searchTableNameNames: {
  [key: string]: {
    ru: string;
    slug: namesSearchTableName;
  };
} = {
  motherboard: { ru: "Материнская плата", slug: "motherboard" },
  processor: { ru: "Процессор", slug: "processor" },
  ram: { ru: "Оперативная память", slug: "ram" },
  "hdd,ssd": { ru: "Хранение данных", slug: "hdd,ssd" },
  hdd: { ru: "Хранение данных", slug: "hdd,ssd" },
  ssd: { ru: "Хранение данных", slug: "hdd,ssd" },
  gpu: { ru: "Видеокарта", slug: "gpu" },
  power_supply: { ru: "Блок питания", slug: "power_supply" },
  case: { ru: "Корпус", slug: "case" },
  "cooler,liquid_cooling,case_fans": {
    ru: "Охлаждение",
    slug: "cooler,liquid_cooling,case_fans",
  },
  case_fans: {
    ru: "Охлаждение",
    slug: "cooler,liquid_cooling,case_fans",
  },
  liquid_cooling: {
    ru: "Охлаждение",
    slug: "cooler,liquid_cooling,case_fans",
  },
  cooler: {
    ru: "Охлаждение",
    slug: "cooler,liquid_cooling,case_fans",
  },
};

export const useSearchTableName = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTableNameFromParams, setSearchTableNameFromParams] = useState<{
    ru: string;
    slug: namesSearchTableName;
  }>({
    ru: "Процессор",
    slug: "processor",
  });
  const params = Object.fromEntries(searchParams.entries());
  // useEffect(() => {

  //   const params = Object.fromEntries(searchParams.entries());
  //   setSearchTableNameFromParams(
  //     searchTableNameNames[params.componentType] || {
  //       ru: "Процессор",
  //       slug: "processor",
  //     }
  //   );
  // }, [searchParams]);

  const searchTableNameState = useAppSelector(
    (state: RootState) => state.searchTableNameReducer.searchTableName
  ) || { ru: "Процессор", slug: "processor" };
  const dispatch = useAppDispatch();

  const setSearchTableName = (newSearchTableName: {
    ru: string;
    slug: string;
  }) => {
    dispatch(setNewSearchTableName({ searchTableName: newSearchTableName }));
  };
  const searchTableName =
    pathname == "/" || pathname == "/Wishlist"
      ? searchTableNameState
      : searchTableNameNames[params.componentType];
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
  cooler: boolean;
  liquid_cooling: boolean;
  case_fans: boolean;
  hdd: boolean;
  ssd: boolean;
};
export const useAdditionParamsForFilters = (): {
  filtersState: FilterState;
  toggleFilter: (
    name: "cooler" | "liquid_cooling" | "case_fans" | "hdd" | "ssd"
  ) => void;
} => {
  const filtersState = useAppSelector(
    (state) => state.additionalParamsForFiltersReducer
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
    processor: 2,
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
  // testData: null | {
  //   [key: string]: any;
  // };
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
      return response.data;
    } catch (error) {
      setError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") {
      fetchFilters();
    } else {
      fetchFilters();
    }
  }, [searchTableName.slug]);
  const refetch = async () => {
    fetchFilters();
  };
  return {
    isLoading,
    error,
    data,
    refetch,
  };
};

export const useComponentsStore = () => {
  const componentsStore: {
    [key: string]: IComponentsResultsInStore[];
  } = useAppSelector((state) => state.componentsStoreReducer);
  const dispatch = useAppDispatch();
  const addComponent = ({
    searchTableName,
    data,
    offer,
    countOfComponents = 1,
  }: {
    searchTableName: { ru: string; slug: namesSearchTableName };
    data: IComponentsResults;
    offer: IOffers;
    countOfComponents: number;
  }) => {
    dispatch(
      addComponentToStore({
        searchTableName: searchTableName,
        component: {
          ...data,
          selectedOffer: offer,
          countOfComponents: countOfComponents,
        },
      })
    );
  };
  const selectedOfferIsInStore = ({
    searchTableName,
    data,
  }: {
    searchTableName: { ru: string; slug: namesSearchTableName };
    data: IComponentsResultsInStore;
  }) => {
    const answer = componentsStore[searchTableName.slug]?.some(
      (elem: IComponentsResultsInStore) =>
        elem.selectedOffer.id == data.selectedOffer.id
    );

    return answer;
  };
  const removeComponent = ({
    searchTableName,
    data,
  }: {
    searchTableName: { ru: string; slug: namesSearchTableName };
    data: IComponentsResultsInStore;
  }) => {
    dispatch(
      removeComponentFromStore({
        searchTableName,
        component: data,
      })
    );
  };
  const getAllIds = (): number[] => {
    const allIds: number[] = [];

    Object.values(componentsStore).forEach((components: unknown) => {
      const componentsArray = components as IComponentsResults[];
      allIds.push(
        ...componentsArray.map((component: IComponentsResults) => component.id)
      );
    });
    return allIds;
  };
  const changeCount = ({
    offerId,
    searchTableName,
    count,
  }: {
    offerId: number;
    searchTableName: { ru: string; slug: namesSearchTableName };
    count: number;
  }) => {
    console.table({ offerId, searchTableName, count });
    dispatch(changeCountOfComponents({ offerId, searchTableName, count }));
  };
  const getPriceOfConfigurator = () => {
    let totalPrice = 0;

    Object.keys(componentsStore).forEach((key) => {
      const components = componentsStore[key];

      components.forEach((component) => {
        const price = component.selectedOffer.price;
        const quantity = component.countOfComponents || 1; // если quantity не указано, то считаем, что оно равно 1

        if (price) {
          totalPrice += price * quantity;
        }
      });
    });

    return totalPrice;
  };
  const componentIsInStore = ({
    searchTableName,
    data,
  }: {
    searchTableName: { ru: string; slug: namesSearchTableName };
    data: IComponentsResults;
  }) => {
    const answer = componentsStore[searchTableName.slug]?.some(
      (elem: IComponentsResults) => elem.id == data.id
    );

    return answer;
  };
  return {
    componentsStore,
    addComponent,
    removeComponent,
    selectedOfferIsInStore,
    getAllIds,
    changeCount,
    getPriceOfConfigurator,
    componentIsInStore,
  };
};

export const useWishlistStore = () => {
  const wishlistStore = useAppSelector((state) => state.wishlistReducer);
  const dispatch = useAppDispatch();
  const addComponentToWishlist = ({
    component,
    price,
    name,
    id,
    isAssembly,
  }: {
    component: IComponentsResults;
    price: number;
    name: string;
    id: number | string;
    isAssembly: boolean;
  }) => {
    const data = {
      component,
      price,
      name,
      id,
      isAssembly,
    };
    dispatch(addComponentWishlist(data));
  };
  const addAssemblyToWishlist = ({
    component,
    price,
    name,
    id,
    isAssembly,
  }: {
    component: any;
    price: number;
    name: string;
    id: number | string;
    isAssembly: true;
  }) => {
    const data = {
      component,
      price,
      name,
      id,
      isAssembly,
    };
    dispatch(addAssemblyWishlist(data));
  };
  const deleteFromWishlist = ({
    id,
    isAssembly,
  }: {
    id: string | number;
    isAssembly?: boolean;
  }) => {
    const element = wishlistStore.find((elem) => elem.component.id === id);
    dispatch(
      deleteComponentFromWishlist({
        id: element?.id || id,
      })
    );
  };
  const componentIsInWishlist = ({ id }: { id: string | number }): boolean => {
    const isIn = wishlistStore.some(
      (elem: IWishList) => elem.component.id === id
    );
    return isIn;
  };
  const editNameOfAssemblyInWishlist = ({
    id,
    name,
  }: {
    id: string | number;
    name: string;
  }) => {
    dispatch(editNameOfAssemblyWishlist({ id, name }));
  };
  return {
    wishlistStore,
    addComponentToWishlist,
    deleteFromWishlist,
    componentIsInWishlist,
    addAssemblyToWishlist,
    editNameOfAssemblyInWishlist,
  };
};

export function useDebounce(callback: any, delay: number) {
  const timer: any = useRef();
  const debouncedCallback = useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
  return debouncedCallback;
}
