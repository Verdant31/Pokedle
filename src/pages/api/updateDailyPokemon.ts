// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import * as AWS from 'aws-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("CHAMOOOOOOOOOOOOOOOOOOOOOOOOU");
  const { id } = req.query;
  const newPokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json());
  console.log(newPokemon);
  res.status(200).json({as: 'hehe'})
}