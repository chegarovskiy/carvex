import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export interface IMark {
    markId: number
    mark: string
    marked: boolean
  }

// localHost:3000/api/model/?search=MarkId
export const GET = async (req :Request) => {

    // get dinamic search parfa
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("");
    if (query) {
        return NextResponse.json({error: "No query provider"}, {status: 400})
    }

    
    const marks: IMark[] = await prisma.mark.findMany({
        where: {
            marked: true,
        }
    })
    return new Response(JSON.stringify(marks));
}