import Link from "next/link";
import React from "react";
import setting from "@/assets/icons/setting.svg";

export default function page() {
  return (
    <div className="flex items-start flex-col pb-[60px]">
      <p className="break-words text-[32px]">
        Гид находится в разработке и совсем скоро появится на этой странице
      </p>
      <div className="w-full border-t-2 border-[#dde1e7] mt-[15px] mb-[30px]" />

      <p className="text-[24px] mb-[30px]">
        А пока мы рекомендуем ознакомиться с видео на канале TehnoBelka <br />
        {/* <a
          href="https://www.youtube.com/watch?v=L9ZwCLNAW4A&ab_channel=TehnoBelka"
          className="underline text-[blue]"
        >
          https://www.youtube.com/watch?v=L9ZwCLNAW4A&ab_channel=TehnoBelka
        </a> */}
      </p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/L9ZwCLNAW4A?si=2leIr9-tlAmUDmaz"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="mb-[10px] w-full max-w-[560px]"
      ></iframe>
      <Link
        href="/"
        className="rounded-[43px] w-full max-w-[365px] justify-center mt-[20px] text-[17px] text-[#0260e8] font-bold max-lg:font-medium border-[#0260e8] border-solid border-[1px] px-[25px] py-[14px] text-center flex gap-[10px] items-center"
      >
        Открыть конфигуратор
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="#0260e8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.8469C9.93 15.8469 8.25 14.1669 8.25 12.0969C8.25 10.0269 9.93 8.34692 12 8.34692C14.07 8.34692 15.75 10.0269 15.75 12.0969C15.75 14.1669 14.07 15.8469 12 15.8469ZM12 9.84692C10.76 9.84692 9.75 10.8569 9.75 12.0969C9.75 13.3369 10.76 14.3469 12 14.3469C13.24 14.3469 14.25 13.3369 14.25 12.0969C14.25 10.8569 13.24 9.84692 12 9.84692Z"
            fill="#0260e8"
          />
          <path
            d="M15.21 22.287C15 22.287 14.79 22.257 14.58 22.207C13.96 22.037 13.44 21.647 13.11 21.097L12.99 20.897C12.4 19.877 11.59 19.877 11 20.897L10.89 21.087C10.56 21.647 10.04 22.047 9.42 22.207C8.79 22.377 8.14 22.287 7.59 21.957L5.87 20.967C5.26 20.617 4.82 20.047 4.63 19.357C4.45 18.667 4.54 17.957 4.89 17.347C5.18 16.837 5.26 16.377 5.09 16.087C4.92 15.797 4.49 15.627 3.9 15.627C2.44 15.627 1.25 14.437 1.25 12.977V11.217C1.25 9.75697 2.44 8.56697 3.9 8.56697C4.49 8.56697 4.92 8.39697 5.09 8.10697C5.26 7.81697 5.19 7.35697 4.89 6.84697C4.54 6.23697 4.45 5.51697 4.63 4.83697C4.81 4.14697 5.25 3.57697 5.87 3.22697L7.6 2.23697C8.73 1.56697 10.22 1.95697 10.9 3.10697L11.02 3.30697C11.61 4.32697 12.42 4.32697 13.01 3.30697L13.12 3.11697C13.8 1.95697 15.29 1.56697 16.43 2.24697L18.15 3.23697C18.76 3.58697 19.2 4.15697 19.39 4.84697C19.57 5.53697 19.48 6.24697 19.13 6.85697C18.84 7.36697 18.76 7.82697 18.93 8.11697C19.1 8.40697 19.53 8.57697 20.12 8.57697C21.58 8.57697 22.77 9.76697 22.77 11.227V12.987C22.77 14.447 21.58 15.637 20.12 15.637C19.53 15.637 19.1 15.807 18.93 16.097C18.76 16.387 18.83 16.847 19.13 17.357C19.48 17.967 19.58 18.687 19.39 19.367C19.21 20.057 18.77 20.627 18.15 20.977L16.42 21.967C16.04 22.177 15.63 22.287 15.21 22.287ZM12 18.587C12.89 18.587 13.72 19.147 14.29 20.137L14.4 20.327C14.52 20.537 14.72 20.687 14.96 20.747C15.2 20.807 15.44 20.777 15.64 20.657L17.37 19.657C17.63 19.507 17.83 19.257 17.91 18.957C17.99 18.657 17.95 18.347 17.8 18.087C17.23 17.107 17.16 16.097 17.6 15.327C18.04 14.557 18.95 14.117 20.09 14.117C20.73 14.117 21.24 13.607 21.24 12.967V11.207C21.24 10.577 20.73 10.057 20.09 10.057C18.95 10.057 18.04 9.61697 17.6 8.84697C17.16 8.07697 17.23 7.06697 17.8 6.08697C17.95 5.82697 17.99 5.51697 17.91 5.21697C17.83 4.91697 17.64 4.67697 17.38 4.51697L15.65 3.52697C15.22 3.26697 14.65 3.41697 14.39 3.85697L14.28 4.04697C13.71 5.03697 12.88 5.59697 11.99 5.59697C11.1 5.59697 10.27 5.03697 9.7 4.04697L9.59 3.84697C9.34 3.42697 8.78 3.27697 8.35 3.52697L6.62 4.52697C6.36 4.67697 6.16 4.92697 6.08 5.22697C6 5.52697 6.04 5.83697 6.19 6.09697C6.76 7.07697 6.83 8.08697 6.39 8.85697C5.95 9.62697 5.04 10.067 3.9 10.067C3.26 10.067 2.75 10.577 2.75 11.217V12.977C2.75 13.607 3.26 14.127 3.9 14.127C5.04 14.127 5.95 14.567 6.39 15.337C6.83 16.107 6.76 17.117 6.19 18.097C6.04 18.357 6 18.667 6.08 18.967C6.16 19.267 6.35 19.507 6.61 19.667L8.34 20.657C8.55 20.787 8.8 20.817 9.03 20.757C9.27 20.697 9.47 20.537 9.6 20.327L9.71 20.137C10.28 19.157 11.11 18.587 12 18.587Z"
            fill="#0260e8"
          />
        </svg>
      </Link>
    </div>
  );
}
