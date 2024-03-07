import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'
import { v4 as uuid4 } from 'uuid'
import { db } from '@vercel/postgres'
import crypto from 'crypto'

export function generateSixDigitNumber() {
  const randomNumber = crypto.randomBytes(3).readUIntBE(0, 3);
  return String(randomNumber).padStart(6, '0');
}

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
      url: process.env.MOMO_REQUEST_TO_PAY_URL as string,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY as string,
        "X-Reference-Id": ref_id,
        "X-Target-Environment": "sandbox",
        "Authorization": `Bearer ${momoToken}`,
      },
      data,
    });
    if(res){
      const dbRes = await saveCollectionToDatabase(
        process.env.MOMO_REQUEST_TO_PAY_URL as string,
        process.env.SUBSCRIPTION_KEY as string,
        momoToken, 
        ref_id,
        );
      return NextResponse.json({ ...res.data, ref_id, dbRes }, { status: res.status });
    }
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error }, { status: error.response.status });
  }
}

const saveCollectionToDatabase = async (url: string, key: string, momoToken: string, ref: string) => {
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
    
    console.log(res.data.status)
    if(!res.data.status) return;

    await client.sql`
      CREATE TABLE IF NOT EXISTS Payment (
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
      INSERT INTO Payment (xRef, status, amount, currency, externalId, payerPartyIdType, payerPartyId, payerMessage, payeeNote) 
      VALUES (${ref}, ${res.data.status}, ${res.data.amount}, ${res.data.currency}, ${res.data.externalId + ''}, ${res.data.payer.partyIdType}, ${res.data.payer.partyId}, ${res.data.payerMessage}, ${res.data.payeeNote});
    `;
    console.log(res.data.status)
    console.log('HERE')
    const test = await client.sql`SELECT * FROM Payment;`;
    // console.log(test.rows)
    return test.rows
  } catch (error) {
    // console.log(error.message);
    throw error;
  }
}