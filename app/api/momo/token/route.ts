import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
   try {
    // GET TOKEN

    // Parse Basic Auth Credentials
    const credentials = await btoa(`${process.env.X_REF}:${process.env.MOMO_API_KEY}`);
    
    const res = await axios({
      method: 'post',
      url: process.env.MOMO_TOKEN_URL as string,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY as string,
        "X-Reference-Id": process.env.X_REF as string,
        "X-Target-Environment": "sandbox",
        "X-Callback-Url": "http://localhost:3000/callback",
        "X-Callback-Host": "http://localhost:3000",
        "Authorization": `Basic ${credentials}`,
      }
    });
  
    return NextResponse.json({ token: res.data.access_token }, { status: 200 })
   } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
   }
}

export const GET = async (request: NextRequest) => {
  const userId = await request.nextUrl.searchParams.get('userId');
  
  return NextResponse.json({ message: "Results fhjsf" }, { status: 200 });
}
