import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import Metrika from "@/app/yandexMetrika/handleYandexMetrika";
import { NavBar } from "@/components/navBar/NavBar";
import axios from "axios";
import { Suspense } from "react";
import ReduxProvider from "@/redux/provider";

export const metadata: Metadata = {
  title: "Techpoisk",
  description: "Конфигуратор ПК",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: Сделать окно с выводом компонентов в сборке, по клику на купить сборку, то же самое в избранном

  //TODO: Сделать подсказки при поиске
  return (
    <html lang="en">
      <ReduxProvider>
        <Suspense fallback={<div>Загрузка ...</div>}>
          <body className={`min-h-screen`}>
            <Metrika />
            <Header />
            <main className="max-w-[1300px] px-[15px] flex-1 flex flex-col mx-auto w-full h-full min-h-[calc(100vh-252px-188px)]">
              {children}
            </main>
            <Footer />
            <div id="modal-root" />
            <NavBar />
          </body>
        </Suspense>
      </ReduxProvider>
    </html>
  );
}
