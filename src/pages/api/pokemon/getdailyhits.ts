// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dailyHits = await prisma.dailyHits.findFirst({
      where: {id: "6356ed31e23edc53d5635caf"},
    })
    return res.status(200).json({dailyHits})
  }catch(err) {
    console.log(err);
  }
}