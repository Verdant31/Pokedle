// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from 'nookies';
import { pokemonApi } from '../../../services/pokemonClient';
import { prisma
 } from "../../../server/db/client";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  if (!pid) return;
  try {
    const { id, name } = await pokemonApi.getPokemonById(Number(pid));
    const oldPokemon = await prisma.dailyPokemon.findFirst({});

    await prisma.dailyPokemon.update({
      where: {
        id: oldPokemon?.id
      },
      data: {
        name,
        lastUpdate: new Date(),
        pokemonId: id
      }
    })

    await prisma.dailyHits.delete({where: {id: oldPokemon?.id}});
    await prisma.dailyHits.update({where: {id: "6356ed31e23edc53d5635caf"}, data: {hits: 0}})
    res.status(200).json({message: 'Novo pokemon do dia adicionado com sucesso.'})
  }catch(err) {
    console.log(err);
  }
}