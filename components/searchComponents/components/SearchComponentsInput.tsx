import React, {
  Dispatch,
  FormEvent,
  FormEventHandler,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import magnifierGrayIcon from "@/assets/icons/magnifier-gray-icon.svg";
import Image from "next/image";
import { useDebounce } from "@/hooks/hooks";
import axios from "axios";
import { IHints } from "@/app/types";

export const SearchComponentsInput = memo(
  ({
    setSearchInput,
  }: {
    setSearchInput: Dispatch<SetStateAction<string>>;
  }) => {
    const [showHints, setShowHints] = useState(false);
    const [inputTextForHints, setInputTextForHints] = useState("");
    const [hintsArr, setHintsArr] = useState<IHints[] | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return setSearchInput(inputRef.current?.value || "");
    };
    // async function getHints() {
    //   try {
    //     setShowHints(false);
    //     const res = axios.get(
    //       `https://techpoisk.com:8443/searchHints/?search=${inputTextForHints}&limit=5`
    //     );
    //     const data = (await res).data;
    //     setShowHints(true);
    //     setHintsArr(data);
    //   } catch (e) {
    //     setShowHints(false);
    //     console.log(e);
    //   }
    // }

    // const debouncedHandleChange = useDebounce(() => {
    //   getHints();
    // }, 500); // Это блин работает :3
    // useEffect(() => {
    //   inputTextForHints !== "" && debouncedHandleChange();
    // }, [inputTextForHints]);
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between gap-[8px] rounded-[30px] border border-[#dde1e7] py-[10px] px-[19px] items-center w-full"
        >
          <input
            type="text"
            className="outline-none h-[20px] w-full placeholder-[#9E9E9E]"
            placeholder="Поиск по категории"
            ref={inputRef}
            onClick={() => {
              setShowHints(true);
            }}
            onChange={(e) => setInputTextForHints(e.target.value)}
          />
          <button type="submit">
            <Image
              src={magnifierGrayIcon}
              width={21}
              height={21}
              alt="magnifierGrayIcon"
            />
          </button>
        </form>
        {/* <div className="w-full h-[1px]  absolute top-[45px] left-0 shadow-2xl">
          {hintsArr?.length !== 0 &&
            hintsArr !== null &&
            showHints &&
            inputTextForHints !== "" &&
            hintsArr?.map((hint, index) => {
              return (
                <button
                  key={index}
                  className="flex p-[5px] bg-white text-left hover:bg-[#bebebe] border-b-[#b9b9b9]"
                  onClick={() => {
                    setSearchInput(hint.name);
                    setShowHints(false);
                  }}
                >
                  {hint.name}
                </button>
              );
            })}
        </div> */}
      </>
    );
  }
);
//TODO сделайть так, чтобы при клике вне подсказок, они закрывались
