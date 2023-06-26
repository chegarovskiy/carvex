import { HEADER } from "dictionarys/dictionary";
import Image from "next/image";
import Search from "./search";
import SearchSelect, { ButtonSelect } from "./searchSelect";
import SearchSelectOptions from "./searchSelectOptions";

const buttonsSelect: ButtonSelect[] = [
  {label: HEADER.SELECT_MARK, href:"/"},
  {label: HEADER.SELECT_MODEL, href:"/models"},
  {label: HEADER.SELECT_MODIFICATION, href:"/modifications"}
];


export default function SearchLayout() {
  return (
    <section>
      <div className="flex box-border justify-center w-screen bg-gray-700 h-[300px]">
        <div className="flex flex-col w-full h-full max-w-layout-1180 bg-gray-600 py-[32px]">
          <div className="flex">
            <div className="flex flex-col bg-gray-500 min-w-max">
              <h2 className="text-white search_text">{HEADER.TEXT_1.toUpperCase()}</h2>
              <div className="flex">
                <h2 className="text-white search_text">{HEADER.TEXT_2.toUpperCase()}&nbsp;</h2>
                <h2 className="text-red1 search_text">{HEADER.TEXT_3.toUpperCase()}</h2>
              </div>
            </div>

            <div className="flex justify-center items-center bg-gray-400 w-full">
            <Search />
            </div>
          </div>
          <div className="flex pt-[16px] w-full h-full bg-gray-300">
            <SearchSelect  buttonsSelect={buttonsSelect} />
            {}
          </div>
        </div>
      </div>
    </section>
  );
}
