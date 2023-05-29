'use client'

import { HEADER } from "dictionarys/dictionary";
import Image from "next/image";
import arrowSelect from "../public/assets/icons/select-arrow.svg";

export default function SearchSelect() {
  return (
    <ul className="flex flex-wrap">
      <li className="flex-1 mr-2">
        <div className="w-384 ">
          <p className="select_title">{HEADER.SELECT_MARK}</p>
          <div className=" relative ">
            <select className="block appearance-none w-full  border-[1.5px] border-solid border-green1 hover:border-green1 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option className=" bg-[rgba(0,0,0,0.4)] border-[1.5px] border-solid border-green1 w-[600px]">
                Really long option that will likely overlap the chevron
              </option>
              <option className="border-[1.5px] border-solid border-green1">Option 2</option>
              <option>Option 3</option>
            </select>
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
      </li>
      <li className="flex-1 mr-2">
        <div className="w-384 ">
          <p className="select_title">{HEADER.SELECT_MODEL}</p>
          <div className=" relative ">
            <select className="block appearance-none w-full  border-[1.5px] border-solid border-green1 hover:border-green1 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option className=" bg-[rgba(0,0,0,0.4)] border-[1.5px] border-solid border-green1">
                Really long option that will likely overlap the chevron
              </option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
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
      </li>
      <li className="flex-1 mr-2">
        <div className="w-384 ">
          <p className="select_title">{HEADER.SELECT_MODIFICATION}</p>
          <div className=" relative ">
            <select className="block appearance-none w-full  border-[1.5px] border-solid border-green1 hover:border-green1 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option className=" bg-[rgba(0,0,0,0.4)] border-[1.5px] border-solid border-green1">
                Really long option that will likely overlap the chevron
              </option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
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
      </li>
    </ul>
  );
}
