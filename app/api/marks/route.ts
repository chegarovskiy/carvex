import { NextApiRequest } from "next"
import { prisma } from '../../../lib/prisma';

// export async function GET(request:NextApiRequest) {
//     const users = [
//         {id:'1', name: 'Bob'},
//         {id:'2', name: 'Jon'},
//         {id:'3', name: 'Lee'},
//     ]

//     return new Response(JSON.stringify(users))
// }
export interface IMark {
    markId: number
    mark: string
    marked: boolean
  }

export const POST = async (req :NextApiRequest) => {
    const {mark, markId, marked}: IMark = await prisma.mark.findMany({
        where: {
            marked: true,
        }
    })
}



