"use client";

import React, { useEffect, useState } from "react";

export function FeedbackComponent() {
  const [responseAddress, setResponseAddress] = useState("");
  const [text, setText] = useState("");
  const [isSended, setIsSended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSended(false);
    setError(false);
    setIsLoading(true);
    if (text === "") return;
    fetch("https://techpoisk.com:8443/feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response_address: responseAddress !== "" ? responseAddress : null,
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSended(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsSended(false);
        console.error(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setText("");
    setTimeout(() => {
      setIsSended(false);
    }, 5000);
  }, [isSended]);
  return (
    <form
      onSubmit={handleSubmit}
      className="max-lg:hidden flex flex-col items-start z-[100] min-w-[300px]"
    >
      <input
        type="text"
        className={
          "border-blue-500 border-2 rounded-2xl w-full h-[52px] mb-[8px] outline-none px-[11px] py-[7px] font-normal text-gray-500 placeholder:whitespace-pre-line placeholder:translate-y-[-10px]"
        }
        placeholder="Укажите ваш Telegram/E-Mail при необходимости получения ответа"
        value={responseAddress}
        onChange={(event) => setResponseAddress(event.target.value)}
      />

      <textarea
        name="comment"
        className={
          "border-blue-500 border-2 rounded-2xl w-full min-h-[185px] outline-none px-[11px] py-[7px] font-normal text-gray-500 mb-[8px] transition-none"
        }
        placeholder="Поле обратной связи"
        value={text}
        maxLength={500}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        className={`rounded-[17px] text-[18px] bg-[#0260e8] py-[4px] px-[30px] text-[white] font-bold  ${
          isSended && error === false && "bg-[#ff5252]"
        } `}
        disabled={text === "" || isSended === true || isLoading === true}
      >
        {isSended && error === false ? "Отправлено" : "Отправить"}
      </button>
    </form>
  );
}
