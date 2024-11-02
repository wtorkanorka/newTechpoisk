import { IWishList } from "@/redux/services/wishlistSlice";
import { IComponentsResultsInStore } from "@/app/types";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import Link from "next/link";
import React, {
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import settingImg from "@/assets/icons/settingImg.svg";
import arrowDownWhite from "@/assets/icons/arrow-down-white.svg";
import { ProductManagerButton } from "@/components/productManagerButton/ProductManagerButton";
import { useWishlistStore } from "@/hooks/hooks";
import arrowBlack from "@/assets/icons/arrow-down-black-icon.svg";
import edit from "@/assets/icons/edit.svg";
export interface configuratorType {
  id: string | number;
  name: string;
  isAssembly: boolean;
  price: number;
  component: {
    motherboard: IComponentsResultsInStore[];
    processor: IComponentsResultsInStore[];
    ram: IComponentsResultsInStore[];
    "hdd,ssd": IComponentsResultsInStore[];
    gpu: IComponentsResultsInStore[];
    power_supply: IComponentsResultsInStore[];
    case: IComponentsResultsInStore[];
    "cooler,liquid_cooling,case_fans": IComponentsResultsInStore[];
  };
}
export const WishListAssemblyRow = memo(
  ({
    product,
    selectedData,
    setSelectedData,
  }: {
    product: configuratorType;
    selectedData: IWishList[];
    setSelectedData: any;
  }) => {
    const [isChanging, setIsChanging] = useState(false);
    const [editedName, setEditedName] = useState("");

    const { deleteFromWishlist, editNameOfAssemblyInWishlist } =
      useWishlistStore();
    function getDescriptionOfAssembly(data: any) {
      let description = "";
      Object.keys(data).forEach((componentType) => {
        data[componentType].forEach((component: IComponentsResultsInStore) => {
          description += ` ${component.name} x ${component.countOfComponents}`;
        });
      });
      return description.length !== 0 ? description : "Пусто";
    }
    function changeName(name: string, defaultName: string, id: string) {
      if (name === "") return defaultName;
      editNameOfAssemblyInWishlist({ name, id });
    }
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current && isChanging) {
        inputRef.current.focus();
      }
    }, [isChanging]);

    useEffect(() => {
      if (!isChanging && inputRef.current) {
        inputRef.current.blur();
      }
    }, [isChanging]);
    function handleSubmit() {
      changeName(editedName, product.name, String(product.id));
    }
    return (
      <div className="flex justify-between max-w-full items-center py-[18px] max-xl:flex-wrap p-2 border-b border-[#DDE1E7]">
        <div className="flex items-center gap-[36px] max-lg:gap-[10px]">
          <input
            type="checkbox"
            className="min-w-[16px] min-h-[16px]"
            onChange={() => {
              setSelectedData((prevSelected: any) => {
                if (
                  prevSelected.some(
                    (elem: { id: string | number }) => elem.id === product.id
                  )
                ) {
                  return prevSelected.filter(
                    (elem: { id: string | number }) => elem.id !== product.id
                  );
                } else {
                  return [...prevSelected, product];
                }
              });
            }}
          />

          <div className="flex items-center gap-[65px] max-lg:gap-[10px]">
            <Image
              src={
                product.component["case"] &&
                product.component["case"][0] &&
                product.component["case"][0].pictures &&
                product.component["case"][0].pictures[0].url
                  ? product.component["case"] &&
                    product.component["case"][0] &&
                    product.component["case"][0].pictures &&
                    product.component["case"][0].pictures[0].url
                  : settingImg
              }
              width={
                product.component["case"] &&
                product.component["case"][0] &&
                product.component["case"][0].pictures &&
                product.component["case"][0].pictures[0].width
                  ? product.component["case"] &&
                    product.component["case"][0] &&
                    product.component["case"][0].pictures &&
                    product.component["case"][0].pictures[0].width
                  : 97
              }
              height={
                product.component["case"] &&
                product.component["case"][0] &&
                product.component["case"][0].pictures &&
                product.component["case"][0].pictures[0].height
                  ? product.component["case"] &&
                    product.component["case"][0] &&
                    product.component["case"][0].pictures &&
                    product.component["case"][0].pictures[0].height
                  : 120
              }
              alt="productRowCard"
              className={`max-w-[97px] max-lg:min-w-[70px] max-lg:max-w-[71px]`}
            />
            <div className="flex flex-col gap-[6px] max-w-[466px]">
              <form
                className="flex items-center gap-[5px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {isChanging && (
                  <input
                    type="text"
                    placeholder={product.name}
                    onChange={(e) => {
                      setEditedName(e.target.value);
                    }}
                    className="border-[gray] outline-none border-[1px] rounded-[5px]"
                    ref={inputRef}
                  />
                )}
                {!isChanging && (
                  <p className="text-[24px] font-[400]">{product.name}</p>
                )}
                <button
                  type={isChanging ? "submit" : "button"}
                  onClick={() => {
                    if (isChanging) {
                      setIsChanging(false);
                      handleSubmit();
                    } else {
                      setIsChanging(true);
                    }
                  }}
                >
                  {isChanging ? (
                    <Image
                      src={arrowBlack}
                      width={26}
                      height={32}
                      alt="edit"
                      className="rotate-180"
                    />
                  ) : (
                    <Image src={edit} width={21} height={21} alt="edit" />
                  )}
                </button>
              </form>
              <p className="text-left text-[18px] font-[400] text-[#9e9e9e] max-lg:text-[12px]">
                {getDescriptionOfAssembly(product.component)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-[27px] max-lg:w-full max-lg:justify-between">
          <div className="flex items-center flex-col gap-[16px]">
            <p className="text-[24px] font-[600] max-lg:text-[16px] text-center w-full">
              {product.price} ₽
            </p>
            <button
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="flex items-center justify-center py-[7px] px-[19px] bg-[#0260e8] rounded-[20px] text-[18px] text-[white] gap-[9px] font-[400] min-w-[201px] max-lg:text-[14px] max-lg:font-[600] max-lg:gap-[10px] max-lg:min-w-[95px] hover:opacity-50"
            >
              <p>Купить сборку</p>
            </button>
          </div>

          <ProductManagerButton
            isWishListButton={true}
            title="Убрать из избранного"
            onClickFunc={() => {
              deleteFromWishlist({ id: product.id });
            }}
          />
        </div>
      </div>
    );
  }
);
