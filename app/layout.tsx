import "../styles/globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Futter from "../components/futter";
import { Roboto, Montserrat } from "next/font/google";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import SearchLayout from "components/searchLayout";

export const metadata: Metadata = {
  title: "Carvex",
  description: "Запчастини",
};
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ["400","500","700"],
  // display: ''
}); 

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ["400","500", "700"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={
        // clsx(' border-indigo-600')
        roboto.variable
        // 'text-black bg-white dark:text-white dark:bg-[#111010]',
        // kaisei.variable
      }
    >
      <body
        className="w-screen box-border"
        // "antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto"
      >
        <main className="flex flex-col box-border items-center w-screen">
          <div className="flex box-border justify-center w-screen   bg-gray1">
            <div className="flex w-full max-w-layout-1600 px-[32px]">
              <Header />
            </div>
          </div>
          <SearchLayout />
         

          <div className="flex box-border justify-center w-screen max-w-layout-1600 ">
            <div className="flex w-full">
              <Sidebar />
              {children}
            </div>
          </div>
          <Futter />

          {/* <Analytics /> */}
        </main>
      </body>
    </html>
  );
}
