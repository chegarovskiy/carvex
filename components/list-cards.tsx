import clsx from "clsx";
import Card from "./card";

export default function ListCards() {
  return (
    <div className="flex flex-wrap w-full bg-orange-300 box-border p-[5px]">
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ].map((card, index) => (
        <Card cardInfo={card} index={index} />
      ))}
    </div>
  );
}
