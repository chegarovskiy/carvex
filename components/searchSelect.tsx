"use client";

import  Marks  from "app/marks/layout";
import { HEADER } from "dictionarys/dictionary";
import Image from "next/image";
import Link from "next/link";
import arrowSelect from "../public/assets/icons/select-arrow.svg";
import { usePathname } from "next/navigation";
import { link } from "fs";
import clsx from "clsx";
import { useEffect, useState } from "react";
import SearchSelectOptions from "./searchSelectOptions";

export type ButtonSelect = {
  label: string;
  href: string;
};
export type ButtonsSelect = {
  buttonsSelect: ButtonSelect[];
};



export default function SearchSelect({
  buttonsSelect,
}: {
  buttonsSelect: ButtonSelect[];
}) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [m, setM] = useState<any>();

  useEffect(() => {
    console.log("m", m)
  }, [m])


  const handleClick = () => {
    // Marks().then(setM).catch(e => {
    //   console.log("error handleClick", e)
    // })
  }


  

  return (
    <>
      {buttonsSelect.map((button) => {
        const isActive: boolean = pathname === button.href;

        return (
          <div key={button.label}>
            <div
              className={"w-384"}
              onClick={(e) => handleClick()}
            >
              <p className="select_title">{button.label}</p>
              <div
                className={clsx("relative", { active_button_select: isActive })}
              >
                <button className="block appearance-none w-full  border-[1.5px] border-solid border-green1 hover:border-green1 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"></button>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Image
                    src={arrowSelect}
                    alt={"arrowSelect"}
                    width={32}
                    height={32}
                    className="fill-current h-4 w-4"
                  />
                </div>
              </div>
            </div>
            <SearchSelectOptions />
          </div>
        );
      })}
    </>
  );
}
