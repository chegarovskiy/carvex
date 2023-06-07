import clsx from "clsx";
import Image from "next/image";
import { type } from "os";
import { useState } from "react";

type CardProps = {
  cardInfo: number;
  index: number;
};

export default function Card(props: CardProps) {
  //   const [isLoading, setLoading] = useState(true);

  return (
    <div>
      <a>
        <div
          key={props.index}
          className="bg-slate-100 w-fit min-h-[390px] h-[390] border-solid border-2 border-indigo-600 box-border m-[5px] "
        >
          <Image
            src={
              "https://content1.rozetka.com.ua/goods/images/big_tile/328128600.jpg"
            }
            alt={"альт"}
            width={200}
            height={100}
            style={{}}
          />
        </div>
      </a>
    </div>
  );
}
