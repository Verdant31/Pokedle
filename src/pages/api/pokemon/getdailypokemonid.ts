// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dbPokemon = await prisma.dailyPokemon.findFirst({})
    return res.status(200).json({dailyPokemonId: dbPokemon?.pokemonId})
  }catch(err) {
    console.log(err);
  }
}