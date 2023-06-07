import { Fira_Code, Roboto_Condensed } from "next/font/google";
import ListCards from "../components/list-cards";


// const font = Roboto_Condensed({
//   subsets: ["latin"],
//   weight: "700",
// });

export default async function Home() {
  return (
    <section className="bg-slate-300 w-full flex-center flex-col">

      
      <ListCards />
    </section>
  );
}
