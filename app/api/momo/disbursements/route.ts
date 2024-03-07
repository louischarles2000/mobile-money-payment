import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'
import { v4 as uuid4 } from 'uuid'
import { db } from '@vercel/postgres'
import { generateSixDigitNumber } from "@/utilities";

export const POST = async (request: NextRequest) => {
  const { 
    body,
    momoToken
   } = await request.json();
  try {
    const externalId = generateSixDigitNumber();
    const data = { ...body, externalId };
    const ref_id = await uuid4();
    console.log(data)

    const res = await axios({
      method: 'post',
      url: process.env.MOMO_TRANSFER_URL as string,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.DISBURSEMENTS_SUBSCRIPTION_KEY as string,
        "X-Reference-Id": ref_id,
        "X-Target-Environment": "sandbox",
        "Authorization": `Bearer ${momoToken}`,
      },
      data,
    });
//    return NextResponse.json({ Message: "OK" }, { status: 202 })
    if(res){
      const dbRes = await saveTransferToDatabase(
        process.env.MOMO_TRANSFER_URL as string,
        process.env.DISBURSEMENTS_SUBSCRIPTION_KEY as string,
        momoToken,
        ref_id,
        );
      return NextResponse.json({ ...res.data, ref_id, dbRes }, { status: res.status });
    }
  } catch (error: any) {
    console.log(error.response)
    return NextResponse.json({ error }, { status: error.response.status });
  }
}

export const GET = async (request: NextRequest) => {

    const client = await db.connect();
    try {
     const collections = await client.sql`SELECT * FROM Transfer;`;
     return NextResponse.json({ collections: collections.rows }, { status: 200 })
    } catch (error) {
        console.log
     return NextResponse.json({ error }, { status: 500 })
    }
 }


const saveTransferToDatabase = async (url: string, key: string, momoToken: string, ref: string) => {
  const client = await db.connect();
  try {
    const res = await axios({
      method: 'get',
      url: `${url}/${ref}`,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": key,
        // "X-Reference-Id": ref,
        "X-Target-Environment": "sandbox",
        "Authorization": `Bearer ${momoToken}`,
      },
    });
    
    // console.log(res.data.status)
    if(!res.data.status) return;

    await client.sql`
      CREATE TABLE IF NOT EXISTS Transfer (
        id SERIAL NOT NULL PRIMARY KEY,
        xRef VARCHAR(100),
        status VARCHAR(100),
        amount DECIMAL(10,2),
        currency VARCHAR(3),
        externalId VARCHAR(50),
        payerPartyIdType VARCHAR(10),
        payerPartyId VARCHAR(20),
        payerMessage VARCHAR(255),
        payeeNote VARCHAR(255)
      );`;

    await client.sql`
      INSERT INTO Transfer (xRef, status, amount, currency, externalId, payerPartyIdType, payerPartyId, payerMessage, payeeNote) 
      VALUES (${ref}, ${res.data.status}, ${res.data.amount}, ${res.data.currency}, ${res.data.externalId + ''}, ${res.data.payee.partyIdType}, ${res.data.payee.partyId}, ${res.data.payerMessage}, ${res.data.payeeNote});
    `;
    console.log(res.data.status)
    console.log('HERE')
    const test = await client.sql`SELECT * FROM Transfer;`;
    // console.log(test.rows)
    return test.rows
  } catch (error) {
    console.log(error)
    throw error;
  }
}