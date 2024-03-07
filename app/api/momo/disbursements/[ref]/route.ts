import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'

export const POST = async (request: NextRequest, { params }: { params: { ref: string; } } ) => {
   const { ref } = params;
   const { momoToken } = await request.json();
  
  try {
    const res = await axios({
      method: 'get',
      url: `${process.env.MOMO_TRANSFER_URL}/${ref}`,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.DISBURSEMENTS_SUBSCRIPTION_KEY as string,
        "X-Target-Environment": "sandbox",
        "Authorization": `Bearer ${momoToken}`,
      },
    });
    return NextResponse.json({ ...res.data, ref }, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: error.response.status });
  }
}

