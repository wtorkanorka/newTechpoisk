"use client";
import { NavigationComponent } from "@/components/NavigationComponent/NavigationComponent";
import React, { useRef, useState } from "react";
import telegramIcon from "@/assets/icons/telegram-blue.svg";
import mailIcon from "@/assets/icons/mail-blue.svg";
import Image from "next/image";

import styles from "./page.module.css";

export default function Page() {
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [reviewIsSanded, setReviewIsSanded] = useState<boolean>(false);
  const sendReview = async (e: any) => {
    e.preventDefault();
    if (!textAreaValue) {
      setReviewIsSanded(false);
      return;
    }
    try {
      const res = await fetch("https://techpoisk.com:8443/feedback/", {
        method: "POST",
        body: JSON.stringify({
          response_address: userAddress,
          text: textAreaValue,
        }),
        headers: { "Content-Type": "application/json" },
      });
      setTextAreaValue("");
      setUserAddress("");
      setReviewIsSanded(true);
      setTimeout(() => {
        setReviewIsSanded(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-start max-lg:flex-col gap-[34px] mt-[20px] mb-[200px]">
      <NavigationComponent currentPage={"52nogletchergang"} />
      <div className="mb-[30px]">
        {/* <p className="text-[32px]">Форма обратной связи</p>
        <div className="w-full border-t-2 border-[#dde1e7] mt-[15px] mb-[30px]" /> */}
        <p className="text-[18px] max-lg:text-[16px]">
          Уважаемые пользователи!
        </p>
        <br /> <br />
        <p>
          В целях оперативного рассмотрения ваших обращений просим максимально
          точно изложить суть вопроса и имеющиеся факты.
        </p>
        <form
          onSubmit={sendReview}
          className="flex flex-col gap-[11px] mt-[15px]"
        >
          <input
            type="text"
            value={userAddress}
            onChange={(e: any) => setUserAddress(e.target.value)}
            placeholder="Укажите ваш Telegram/E-Mail при необходимости получения ответа"
            className="outline-none border-solid border-[2px] border-[#dde1e7] rounded-[30px] text-[18px] max-lg:text-[16px] text-[black] py-[9px] px-[10px]"
          />
          <div className="w-full relative">
            <textarea
              value={textAreaValue}
              placeholder="Поле обратной связи"
              maxLength={500}
              onChange={(e: any) => {
                setTextAreaValue(e.target.value);
              }}
              className={`transition-none w-full outline-none border-solid border-[2px] border-[#dde1e7] rounded-[20px] text-[18px] max-lg:text-[16px] text-[black] py-[9px] px-[10px] min-h-[317px] max-lg:min-h-[185px]`}
            />
            <p className="absolute right-[14px] bottom-[14px] text-[#646464] text-[20px] max-lg:text-[14px]">
              {textAreaValue.split("").length || 0}/500
            </p>
          </div>

          <div className="flex justify-between items-start max-lg:flex-col-reverse">
            <div className="flex flex-col gap-[10px] justify-between">
              <p className="text-[18px] max-lg:text-[16px] font-bold max-lg:font-medium">
                Так же для связи используйте
              </p>

              <a
                target="_blank"
                href="https://t.me/techworld_qa"
                className="flex gap-[5px] items-center mb-[10px] underline mt-[20px] text-[#0260E8]"
              >
                <Image
                  src={telegramIcon}
                  width={20}
                  height={12}
                  alt="telegram"
                />{" "}
                <p className="text-[18px] font-bold max-lg:font-medium">
                  @techworld_qa
                </p>
              </a>
              <a
                href="mailto:request@techpoisk.com"
                className="flex gap-[5px] items-center"
              >
                <Image src={mailIcon} width={20} height={12} alt="telegram" />{" "}
                <p className="text-[18px] max-lg:text-[16px] underline text-[#0260E8] font-bold max-lg:font-medium">
                  request@techpoisk.com
                </p>
              </a>
            </div>
            <button
              disabled={reviewIsSanded}
              type="submit"
              className="bg-[#0260E8] text-[white] text-[24px] rounded-[5px] flex justify-center items-center py-[10px] px-[52px] max-lg:mb-[20px] max-lg:py-[5px] max-lg:px-[15px] max-lg:text-[16px]"
              style={{ background: reviewIsSanded ? "#FF5252" : "#0260E8" }}
            >
              {reviewIsSanded ? "Отправлено" : "Отправить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
