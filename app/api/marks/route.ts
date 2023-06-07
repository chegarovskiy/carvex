import { NextApiRequest } from "next"
import { prisma } from '../../../lib/prisma';

// localHost:3000/api/marks
export interface IMark {
    markId: number
    mark: string
    marked: boolean
  }

export const GET = async (req :NextApiRequest) => {
    const marks: IMark[] = await prisma.mark.findMany({
        where: {
            marked: true,
        }
    })
    return new Response(JSON.stringify(marks));
}



