import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const POST = async (request: NextRequest) => {
    const { momoToken } = await request.json();
   try {
    const res = await axios({
        method: 'get',
        url: process.env.DISBURSEMENTS_BALANCE_URL as string,
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": process.env.DISBURSEMENTS_SUBSCRIPTION_KEY as string,
          "X-Target-Environment": "sandbox",
          "Authorization": `Bearer ${momoToken}`,
        }
      });
      console.log(res.data)
    
    return NextResponse.json({ ...res.data }, { status: 200 })
   } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error }, { status: 500 })
   }
}
