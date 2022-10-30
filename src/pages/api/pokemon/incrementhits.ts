// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.dailyHits.update({
      where: {id: "6356ed31e23edc53d5635caf"},
      data: {hits: {increment: 1}},
    })
    return res.status(200).json({message: "Incrementado com sucesso."})
  }catch(err) {
    console.log(err);
  }
}