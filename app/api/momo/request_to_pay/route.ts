import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'
import { v4 as uuid4 } from 'uuid'

export const POST = async (request: NextRequest) => {
  const { 
    body,
    momoToken
   } = await request.json();
  
  try {
    const ref_id = await uuid4();
    const res = await axios({
      method: 'post',
      url: process.env.MOMO_REQUEST_TO_PAY_URL as string,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY as string,
        "X-Reference-Id": ref_id,
        "X-Target-Environment": "sandbox",
        "Authorization": `Bearer ${momoToken}`,
      },
      data: body,
    });
    return NextResponse.json({ ...res.data, ref_id }, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: error.response.status });
  }
}

