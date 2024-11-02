"use client";
import Image from "next/image";
import React from "react";
import footerTelegramm from "@/assets/icons/footer-telegramm.svg";
import footerYoutube from "@/assets/icons/footer-youtube.svg";
import logoTechpoiskFooter from "@/assets/images/Logo-techpoisk-footer.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Footer() {
  const pathname = usePathname();

  return (
    <div className="bg-[#262626] py-[24px] px-[15px] mt-[76px] max-lg:mt-[53px] max-lg:mb-[61px]">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex justify-between gap-[47px] max-lg:gap-[10px]">
          <div className="flex gap-[122px] items-center min-w-[473px] max-lg:flex-col max-lg:gap-[20px] max-lg:items-start max-lg:min-w-[150px]">
            <ul className="flex flex-col gap-[30px] items-start max-lg:gap-[20px]">
              <li
                className={`text-[18px] text-[white] font-[400] font-sans-regular hover:opacity-50 max-lg:text-[12px] ${
                  pathname === "/about" ? "text-[#0260e8]" : ""
                }`}
              >
                <Link
                  href="/about"
                  className={`${pathname === "/about" ? "text-[#0260e8]" : ""}`}
                >
                  О компании
                </Link>
              </li>
              <li
                className={`text-[18px] text-[white] font-[400] font-sans-regular hover:opacity-50 max-lg:text-[12px] ${
                  pathname === "/contacts" ? "text-[#0260e8]" : ""
                }`}
              >
                <Link
                  href="/contacts"
                  className={`${
                    pathname === "/contacts" ? "text-[#0260e8]" : ""
                  }`}
                >
                  {" "}
                  Контакты
                </Link>
              </li>
              <li
                className={`text-[18px] text-[white] font-[400] font-sans-regular hover:opacity-50 max-lg:text-[12px] ${
                  pathname === "/partners" ? "text-[#0260e8]" : ""
                }`}
              >
                <Link
                  href="/partners"
                  className={`${
                    pathname === "/partners" ? "text-[#0260e8]" : ""
                  }`}
                >
                  Партнёрам
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col gap-[30px] items-start max-lg:gap-[20px]">
              <li
                className={`text-[18px] text-[white] font-[400] font-sans-regular hover:opacity-50 max-lg:text-[12px] ${
                  pathname === "/identity" ? "text-[#0260e8]" : ""
                }`}
              >
                <Link
                  href="/identity"
                  className={`${
                    pathname === "/identity" ? "text-[#0260e8]" : ""
                  }`}
                >
                  {" "}
                  Политика конфиденциальности
                </Link>
              </li>
              <li
                className={`text-[18px] text-[white] font-[400] font-sans-regular hover:opacity-50 max-lg:text-[12px] ${
                  pathname === "/52nogletchergang" ? "text-[#0260e8]" : ""
                }`}
              >
                <Link
                  href="/52nogletchergang"
                  className={`${
                    pathname === "/52nogletchergang" ? "text-[#0260e8]" : ""
                  }`}
                >
                  Обратная связь
                </Link>
              </li>
              <li
                className={`text-[18px] text-[white] font-[400] font-sans-regular hover:opacity-50 max-lg:text-[12px] ${
                  pathname === "/delivery" ? "text-[#0260e8]" : ""
                }`}
              >
                <Link
                  href="/delivery"
                  className={`${
                    pathname === "/delivery" ? "text-[#0260e8]" : ""
                  }`}
                >
                  Оплата и доставка
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-between w-full items-end max-lg:flex-col">
            <div className="flex gap-[22px] items-center">
              <a href="https://t.me/techpoisk" target="_blank">
                <Image
                  src={footerTelegramm}
                  width={45}
                  height={45}
                  alt="footerTelegramm"
                  className="max-lg:w-[30px] max-lg:h-[30px]"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCbuIiHAIOV88JJQNZMN_LUw"
                target="_blank"
              >
                <Image
                  src={footerYoutube}
                  width={45}
                  height={45}
                  alt="footerYoutube"
                  className="max-lg:w-[30px] max-lg:h-[30px]"
                />
              </a>
            </div>
            <div className="flex flex-col max-w-[300px] items-end">
              <Image
                src={logoTechpoiskFooter}
                width={274}
                height={82}
                alt="logoTechpoiskFooter"
                className="max-lg:w-[120px]"
              />
              <p className="font-[400] text-[17px] text-right text-[white] max-lg:text-[9px]">
                Покупай лучшие комплектующие за лучшую цену в кратчайший срок
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#D1CBCB] my-[20px]" />

        <p className="text-[15px] text-[white] font-[400] max-lg:text-[10px]">
          © 2023–2024 Компания Техпоиск
        </p>
      </div>
    </div>
  );
}
