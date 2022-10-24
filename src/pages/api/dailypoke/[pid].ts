// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { pokemonApi } from '../../../services/pokemonClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  if (!pid) return;
  try {
    const  { name, id } = await pokemonApi.getPokemonById(Number(pid));
    await prisma.dailyPokemon.create({data:{name, pokemonId: id}})
    res.status(200).json({message: 'Novo pokemon do dia adicionado com sucesso.'})
  }catch(err) {
    console.log(err);
  }
}