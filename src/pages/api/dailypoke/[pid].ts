// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from 'nookies';
import { pokemonApi } from '../../../services/pokemonClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  if (!pid) return;
  try {
    const { id } = await pokemonApi.getPokemonById(Number(pid));
    setCookie({res}, 'dailypoke', id.toString())
    res.status(200).json({message: 'Novo pokemon do dia adicionado com sucesso.'})
  }catch(err) {
    console.log(err);
  }
}