import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'

// const tok = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjVmZjIxMzMwLTE0MDUtNDQ5MC1iYjhmLTFmYTQwODVjMGQwYiIsImV4cGlyZXMiOiIyMDI0LTAzLTA0VDAwOjE5OjIyLjg4NCIsInNlc3Npb25JZCI6Ijg3MDhlMDBkLTkwZDEtNDM3ZC05YTk4LTk2ZTk1NTk2OWQ5YyJ9.am7l8GWka4t1R_RRcFjYRlrTQ72O8Dvyx17_bcsyhaZVcMQzdjP5mQHoSXipHMyrD_nbMDt6JDEua87ca1PSlsahb_btyGcmkKBEjNpbi4CGkOrB7JPKV6-lMXH6owml4pZId1jIUw5fscPeVFCcCx6REwzUa7dVxKOvrCrhjj1aGJv5P6fnps5nErWR9HmN8UY6GdDTVy4-NGg_1x7tOMQO1akErujDIcxexL0H3VwKA8S3Ru5Iv67UngkJNTIe6e2F2UVI88RpJ97eAn25okkKMY7J_UdBfIBz5_yaIgZxxoWCvK-1hoDs8Ckcmrl1wbFMCHMu-QfY0SR0vjGetg"
export const POST = async (request: NextRequest, { params }: { params: { ref: string; } } ) => {
   const { ref } = params;
   const { momoToken } = await request.json();
  
  try {
    const res = await axios({
      method: 'get',
      url: `${process.env.MOMO_REQUEST_TO_PAY_URL}/${ref}`,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY as string,
        // "X-Reference-Id": ref,
        "X-Target-Environment": "sandbox",
        "Authorization": `Bearer ${momoToken}`,
      },
    });
    // return NextResponse.json({ref }, { status: 200 });
    return NextResponse.json({ ...res.data, ref }, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: error.response.status });
  }
}

