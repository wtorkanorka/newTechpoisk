import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoTechpoisk from "@/app/assets/images/logo-techpoisk.png";
import settingWhite from "@/app/assets/icons/setting-white.svg";

export function HeaderFirstLayer() {
  return (
    <div className="w-full flex justify-between max-lg:justify-center">
      <Link href={"/"}>
        <Image
          src={logoTechpoisk}
          width={274}
          height={82}
          alt="logo-techpoisk"
          className="max-lg:w-[135px] max-lg:h-[43px]"
        />
      </Link>

      <div className="flex items-center gap-[84px] max-lg:hidden">
        <div className="flex gap-[47px] items-center">
          <Link
            href={"/"}
            className="font-[300] text-[#9e9e9e] text-[17px] hover:text-[#777777]"
          >
            Гид по сборке
          </Link>
          <Link
            href={"/"}
            className="font-[300] text-[#9e9e9e] text-[17px] hover:text-[#777777]"
          >
            Сборки пользователей
          </Link>
        </div>

        <Link
          href="/"
          className="rounded-[43px] bg-[#ff5252] px-[25px] py-[13px] text-[white] flex gap-[15px] font-sans-semiBold font-[600] text-[20px] hover:opacity-50w transition-all hover:opacity-50"
        >
          <Image src={settingWhite} alt="settingWhite" width={24} height={24} />
          Конфигуратор
        </Link>
      </div>
    </div>
  );
}
