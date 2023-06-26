import MarksPage from "./page";

// export async function Marks() {
//     const res = await fetch('http://localHost:3000/api/marks', {
//         method: "GET",
//         cache: 'no-store'
//     })
//     // const data = await res;
//     console.log(res)
    


   
// }

export default function MarksLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (<div>
        <h3>MarksLayout</h3>
        <MarksPage/>

    </div>)
}