import { NextRequest, NextResponse } from "next/server";
import { db } from '@vercel/postgres'

export const GET = async (request: NextRequest) => {
   const client = await db.connect();
   try {
    const collections = await client.sql`SELECT * FROM Payment;`;
    return NextResponse.json({ collections: collections.rows }, { status: 200 })
   } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
   }
}
