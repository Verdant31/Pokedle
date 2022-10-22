// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  const newPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pid}`).then(res => res.json());
  console.log(newPokemon);
  const pokemonId = newPokemon.id.toString();
  await prisma.dailyPokemon.create({data:{name: newPokemon.name, pokemonId}})
  res.status(200).json({as: 'hehe'})
}