import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import ReduxProvider from "@/app/redux/provider";
import { NavBar } from "./components/navBar/NavBar";
import axios from "axios";

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
      <ReduxProvider>
        <body className={`min-h-screen`}>
          <Header />
          <main className="max-w-[1300px] px-[15px] flex-1 flex flex-col mx-auto w-full h-full">
            {children}
          </main>
          <Footer />
          <div id="modal-root" />
          <NavBar />
        </body>
      </ReduxProvider>
    </html>
  );
}
