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
import { useComponentsStore, useWishlistStore } from "@/hooks/hooks";
import arrowBlack from "@/assets/icons/arrow-down-black-icon.svg";
import edit from "@/assets/icons/edit.svg";
import ModalPortal from "@/components/modalPortal/ModalPortal";
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { componentsStore } = useComponentsStore();
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
    function extractComponentsFromStore(): IComponentsResultsInStore[] {
      const arr = Object.values(product.component).flat();

      return arr;
    }
    function handleCloseModal() {
      setIsModalOpen(false);
    }

    return (
      <>
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
                  setIsModalOpen(true);
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
        <ModalPortal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          classes="max-h-full"
          innerClasses="!h-[60vh]"
        >
          <div className="flex flex-col w-full overflow-y-auto max-h-full overscroll-contain">
            {extractComponentsFromStore().map((elem) => {
              return (
                <div
                  key={elem.selectedOffer.id}
                  className="flex items-center justify-between border-b border-solid border-gray-300  py-[24px] "
                >
                  <Link
                    href={`/ProductCard/${elem.id}`}
                    className="flex items-center"
                  >
                    <Image
                      src={
                        elem.pictures &&
                        elem.pictures[0] &&
                        elem.pictures[0].url
                          ? elem.pictures[0].url
                          : settingImg
                      }
                      width={72}
                      height={72}
                      alt="logo component"
                      className="max-lg:w-[30px] max-lg:h-[30px]"
                    />
                    <div className="flex flex-col gap-[6px] max-w-[495px] ml-[28px] max-lg:ml-[5px] mr-[10px]">
                      <h3 className="max-lg:text-[12px] w-full">{elem.name}</h3>
                      {/* <div className="flex gap-[5px] flex-wrap max-lg:hidden">
                      {elem.?.map((e: any, index: number) => {
                        return (
                          <p className="text-[14px] text-[#9e9e9e]" key={index}>
                            {e.value}
                          </p>
                        );
                      })}
                    </div> */}
                    </div>
                  </Link>
                  <a
                    target="_blank"
                    href={
                      (elem.selectedOffer &&
                        elem.selectedOffer &&
                        elem.selectedOffer.buyLink) ||
                      ""
                    }
                    className="whitespace-nowrap flex items-center gap-[10px] text-[white] text-[20px] rounded-[38px] bg-[#0260e8] py-[12px] px-[35px] max-lg:text-[14px] max-lg:py-[7px] max-lg:px-[21px] hover:bg-[#599eff]"
                  >
                    В магазин{" "}
                    {/* <Image
                    src={externalLink}
                    width={24}
                    height={24}
                    alt="externalLink"
                    className="max-lg:hidden"
                  /> */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="max-lg:hidden"
                    >
                      <path
                        d="M11 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V13"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 12L21 3"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 9V3H15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
        </ModalPortal>
      </>
    );
  }
);
