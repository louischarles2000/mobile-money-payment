import axios from "axios";
import crypto from 'crypto';

export function getRandomPrice() {
    return Math.floor(Math.random() * (800 - 150 + 1)) + 150;
}

export const getMomoToken = async (url: string) => {
    try {
      const res = await axios.post(url, {})
      console.log(res);
      return res.data.token
    } catch (error: any) {
        throw error
    }
  }
  export function generateSixDigitNumber() {
    const randomNumber = crypto.randomBytes(3).readUIntBE(0, 3);
    return String(randomNumber).padStart(6, '0');
  }
  