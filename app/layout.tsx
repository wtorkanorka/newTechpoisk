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
  return (
    <html lang="en">
      <body className={`min-h-screen`}>
        <ReduxProvider>
          <Suspense fallback={<div>Загрузка ...</div>}>
            <Metrika />
            <Header />
            <main className="max-w-[1300px] px-[15px] flex-1 flex flex-col mx-auto w-full h-full min-h-[calc(100vh-252px-188px)]">
              {children}
            </main>
            <Footer />
            <div id="modal-root" />
            <NavBar />
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
