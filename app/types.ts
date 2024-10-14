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

export interface ISelectFilterComponent {
  type: string;
  name: string;
}
