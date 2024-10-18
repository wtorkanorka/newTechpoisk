//Типы для Фильтров
// |
// v
export interface IFiltersValues {
  value: string | number; //'GIGABYTE'
  count: number | null | undefined;
}

export interface IProperties {
  id: number;
  name: string; //"Производитель"
  slug: string; //manufacturer
  isFilter: boolean; //true
  values: IFiltersValues[];
}

export interface IPropertyCategories {
  id: number;
  name: string; //"Основные"
  properties: IProperties[];
}

export interface IFilters {
  id: number;
  name: string; //"Материнская плата"
  slug: string; //"motherboard"
  isMultiple: boolean; // false
  propertyCategories: IPropertyCategories[];
}
// ^
// |
//Типы для Фильтров

export interface ISelectFilterComponent {
  type: string;
  name: string;
}

//Типы для компонентов
// |
// v

export interface IOffers {
  buyLink: string;
  id: number;
  price: number;
  store: {
    id: number;
    name: string;
    logo: {
      height: number;
      id: number;
      url: string;
      width: number;
    };
  };
}
export interface IPictures {
  componentId: number;
  height: number;
  id: number;
  url: string;
  width: number;
}
export interface IComponentsPropertyCategories {
  type: string;
  properties: {
    id: number;
    isFilter: boolean;
    isShort: boolean;
    name: string;
    slug: string;
    value: string;
  }[];
}
export interface IComponentsResults {
  componentType: string;
  id: number;
  isAvailable: boolean;
  isCompatible: boolean;
  name: string;
  offers: IOffers[];
  pictures: IPictures[];
  propertyCategories: IComponentsPropertyCategories;

  warnings: [];
}
export interface IComponentsGlobal {
  count: number;
  countByValyue: {};
  maxPrice: number;
  minPrice: number;
  next: string | null;
  previous: string | null;
  pageSize: number;
  results: IComponentsResults[];
}

export interface IComponentsResultsInStore {
  componentType: string;
  id: number;
  isAvailable: boolean;
  isCompatible: boolean;
  name: string;
  offers: IOffers[];
  pictures: IPictures[];
  propertyCategories: IComponentsPropertyCategories;
  selectedOffer: IOffers;
  countOfComponents: number;
  warnings: [];
}

// ^
// |
//Типы для компонентов
