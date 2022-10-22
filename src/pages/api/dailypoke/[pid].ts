// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("CHAMOU CARALHO");
  const { pid } = req.query;
  const newPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pid}`).then(res => res.json());
  console.log(newPokemon);
  res.status(200).json({as: 'hehe'})
}