import axios from "axios";

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
