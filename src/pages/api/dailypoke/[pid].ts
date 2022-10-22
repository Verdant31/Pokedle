// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  try {
    console.log("esse é o pid", pid);
    const { name, id } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pid}`).then((res) => res.data)
    console.log(name, id);
    // await prisma.dailyPokemon.create({data:{name, pokemonId: id.toString()}})
    res.status(200).json({as: 'hehe'})
  }catch(err: any) {
    console.log(err);
  }

}